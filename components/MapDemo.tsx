"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { latLngToTileId, tileIdToBounds } from "@/lib/tiles";

/* ------------------------------------------------------------------ */
/*  Map style — same dark tiles as FogMap                              */
/* ------------------------------------------------------------------ */

const DARK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    { id: "carto", type: "raster", source: "carto", minzoom: 0, maxzoom: 20 },
  ],
};

/* ------------------------------------------------------------------ */
/*  Demo walk data — UW Seattle campus                                 */
/* ------------------------------------------------------------------ */

interface DemoWalk {
  name: string;
  subtitle: string;
  echo: string;
  path: [number, number][]; // [lat, lng]
  durationMs: number;
}

const DEMO_WALKS: DemoWalk[] = [
  {
    name: "Morning with Echo",
    subtitle: "Jordan\u2019s solo walk through the Quad",
    echo: "Hey. Glad you\u2019re out here. The cherry trees look incredible today.",
    durationMs: 5000,
    path: [
      [47.6563, -122.309],
      [47.6567, -122.3083],
      [47.6571, -122.3076],
      [47.6575, -122.3069],
      [47.6579, -122.3063],
      [47.6583, -122.3058],
      [47.6586, -122.3051],
      [47.6588, -122.3044],
      [47.6586, -122.3038],
      [47.6582, -122.3035],
      [47.6578, -122.304],
      [47.6575, -122.3047],
      [47.6572, -122.3054],
      [47.6569, -122.3061],
      [47.6566, -122.3068],
      [47.6563, -122.3075],
    ],
  },
  {
    name: "Dog walk with Luna",
    subtitle: "Kobe\u2019s morning route with his dog",
    echo: "Luna\u2019s usual route? 3 tiles left to complete this block.",
    durationMs: 5000,
    path: [
      [47.6561, -122.3094],
      [47.6559, -122.3087],
      [47.6557, -122.3079],
      [47.6555, -122.3071],
      [47.6553, -122.3063],
      [47.6551, -122.3055],
      [47.6549, -122.3047],
      [47.6547, -122.3039],
      [47.6545, -122.3031],
      [47.6543, -122.3023],
      [47.6541, -122.3015],
      [47.6539, -122.3007],
      [47.6537, -122.2999],
      [47.6535, -122.2991],
    ],
  },
  {
    name: "Kobe\u2019s group explore",
    subtitle: "Priya was here yesterday \u2014 filling in her gaps",
    echo: "Priya was here yesterday. You\u2019re filling in her gaps. The group map is growing.",
    durationMs: 5000,
    path: [
      [47.6607, -122.3105],
      [47.6603, -122.3112],
      [47.6599, -122.3119],
      [47.6595, -122.3126],
      [47.6591, -122.3133],
      [47.6587, -122.3138],
      [47.6583, -122.3143],
      [47.6578, -122.3147],
      [47.6573, -122.3149],
      [47.6568, -122.3151],
      [47.6563, -122.3152],
      [47.6558, -122.3153],
      [47.6553, -122.3154],
    ],
  },
];

const UW_CENTER: [number, number] = [-122.3055, 47.6553]; // [lng, lat]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371_000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pathDistance(path: [number, number][]): number {
  let d = 0;
  for (let i = 1; i < path.length; i++) {
    d += haversineMeters(path[i - 1][0], path[i - 1][1], path[i][0], path[i][1]);
  }
  return d;
}

function metersToMiles(m: number): string {
  return (m * 0.000621371).toFixed(1);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MapDemo() {
  /* ---- Refs ---- */
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const animRef = useRef<number>(0);
  const tilesRef = useRef<Record<string, number>>({});
  const distRef = useRef(0);
  const mapReady = useRef(false);

  /* ---- State ---- */
  const [walkIndex, setWalkIndex] = useState(-1); // -1 = intro
  const [phase, setPhase] = useState<"ready" | "animating" | "done">("ready");
  const [tileCount, setTileCount] = useState(0);
  const [displayDistance, setDisplayDistance] = useState(0);

  const isIntro = walkIndex === -1;
  const isSummary =
    walkIndex >= DEMO_WALKS.length - 1 && phase === "done";
  const currentWalk = walkIndex >= 0 ? DEMO_WALKS[walkIndex] : null;

  /* ---- Map init ---- */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: DARK_STYLE,
      center: UW_CENTER,
      zoom: 13.5,
      minZoom: 12,
      maxZoom: 17,
      interactive: false,
      attributionControl: false,
    });

    map.on("load", () => {
      // --- Fog (world overlay with holes) ---
      map.addSource("fog", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-180, -85],
                [180, -85],
                [180, 85],
                [-180, 85],
                [-180, -85],
              ],
            ],
          },
        },
      });
      map.addLayer({
        id: "fog-layer",
        type: "fill",
        source: "fog",
        paint: { "fill-color": "#0a0a0a", "fill-opacity": 0.85 },
      });

      // --- Heat tiles ---
      map.addSource("heat", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "heat-layer",
        type: "fill",
        source: "heat",
        paint: { "fill-color": "#F4A261", "fill-opacity": 0.2 },
      });

      // --- Trail line ---
      map.addSource("trail", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      });
      map.addLayer({
        id: "trail-line",
        type: "line",
        source: "trail",
        paint: {
          "line-color": "#F4A261",
          "line-width": 3,
          "line-opacity": 0.7,
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      // --- Spotlight glow ---
      map.addSource("spotlight", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: [0, 0] },
        },
      });
      map.addLayer({
        id: "spotlight-glow",
        type: "circle",
        source: "spotlight",
        paint: {
          "circle-radius": 60,
          "circle-color": "#F4A261",
          "circle-opacity": 0.08,
          "circle-blur": 1,
        },
      });

      mapRef.current = map;
      mapReady.current = true;
    });

    return () => {
      map.remove();
      mapRef.current = null;
      mapReady.current = false;
    };
  }, []);

  /* ---- Map helpers ---- */

  const updateFog = useCallback((tiles: Record<string, number>) => {
    const map = mapRef.current;
    if (!map || !mapReady.current) return;

    const features: GeoJSON.Feature[] = Object.entries(tiles).map(
      ([tileId, visitCount]) => ({
        type: "Feature" as const,
        properties: { visitCount, tileId },
        geometry: {
          type: "Polygon" as const,
          coordinates: [tileIdToBounds(tileId)],
        },
      })
    );

    const fogSrc = map.getSource("fog") as maplibregl.GeoJSONSource;
    if (fogSrc) {
      fogSrc.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-180, -85],
              [180, -85],
              [180, 85],
              [-180, 85],
              [-180, -85],
            ],
            ...features.map(
              (f) => (f.geometry as GeoJSON.Polygon).coordinates[0]
            ),
          ],
        },
      });
    }

    const heatSrc = map.getSource("heat") as maplibregl.GeoJSONSource;
    if (heatSrc)
      heatSrc.setData({ type: "FeatureCollection", features });
  }, []);

  const updateTrail = useCallback((points: [number, number][]) => {
    const src = mapRef.current?.getSource(
      "trail"
    ) as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    src.setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: points.map(([lat, lng]) => [lng, lat]),
      },
    });
  }, []);

  const updateSpotlight = useCallback((lat: number, lng: number) => {
    const src = mapRef.current?.getSource(
      "spotlight"
    ) as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    src.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [lng, lat] },
    });
  }, []);

  const ensureMarker = useCallback((lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;

    if (!markerRef.current) {
      const el = document.createElement("div");
      el.style.cssText = "width:28px;height:28px;position:relative;";
      el.innerHTML = `
        <style>@keyframes _mpd{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(2.2);opacity:0}}</style>
        <div style="position:absolute;inset:-8px;background:radial-gradient(circle,rgba(244,162,97,0.5) 0%,transparent 70%);border-radius:50%;animation:_mpd 2s ease-in-out infinite;"></div>
        <div style="width:28px;height:28px;background:radial-gradient(circle at 35% 35%,#F4C77D,#F4A261 50%,#E07640);border-radius:50%;box-shadow:0 0 20px rgba(244,162,97,0.7),0 0 40px rgba(244,162,97,0.3),0 0 60px rgba(244,162,97,0.1);"></div>
      `;
      markerRef.current = new maplibregl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([lng, lat])
        .addTo(map);
    } else {
      markerRef.current.setLngLat([lng, lat]);
    }
  }, []);

  const removeMarker = useCallback(() => {
    markerRef.current?.remove();
    markerRef.current = null;
  }, []);

  /* ---- Animation ---- */

  const startAnimation = useCallback(
    (idx: number) => {
      const walk = DEMO_WALKS[idx];
      const map = mapRef.current;
      if (!walk || !map) return;

      setPhase("animating");

      // Fly camera to the walk's starting point
      const [startLat, startLng] = walk.path[0];
      map.flyTo({ center: [startLng, startLat], zoom: 15, duration: 1200 });

      // Snapshot mutable refs at animation start
      const localTiles = { ...tilesRef.current };
      const baseDist = distRef.current;
      const walkTotalDist = pathDistance(walk.path);
      const trail: [number, number][] = [];
      let startTime = 0;
      let frameCount = 0;

      const animate = (now: number) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / walk.durationMs, 1);

        // Interpolate position along path
        const segs = walk.path.length - 1;
        const raw = progress * segs;
        const i = Math.min(Math.floor(raw), segs - 1);
        const t = raw - i;
        const [lat1, lng1] = walk.path[i];
        const [lat2, lng2] =
          walk.path[Math.min(i + 1, walk.path.length - 1)];
        const lat = lat1 + (lat2 - lat1) * t;
        const lng = lng1 + (lng2 - lng1) * t;

        // Update marker + spotlight
        ensureMarker(lat, lng);
        updateSpotlight(lat, lng);

        // Build trail
        trail.push([lat, lng]);

        // Reveal tile
        const tileId = latLngToTileId(lat, lng);
        if (!localTiles[tileId]) {
          localTiles[tileId] = 1;
        }

        frameCount++;

        // Sync visuals periodically (every 4 frames) or at the end
        if (frameCount % 4 === 0 || progress >= 1) {
          updateFog(localTiles);
          updateTrail(trail);
          setTileCount(Object.keys(localTiles).length);
          setDisplayDistance(baseDist + walkTotalDist * progress);
        }

        // Gentle camera tracking
        if (frameCount % 40 === 0) {
          map.easeTo({ center: [lng, lat], duration: 800 });
        }

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          // Walk complete
          tilesRef.current = localTiles;
          distRef.current = baseDist + walkTotalDist;
          setTileCount(Object.keys(localTiles).length);
          setDisplayDistance(distRef.current);
          setPhase("done");

          // Zoom out to show context
          setTimeout(() => {
            map?.flyTo({
              center: UW_CENTER,
              zoom: 13.8,
              duration: 1500,
            });
          }, 600);
        }
      };

      // Start after camera fly-in completes
      setTimeout(() => {
        animRef.current = requestAnimationFrame(animate);
      }, 1300);
    },
    [ensureMarker, updateSpotlight, updateFog, updateTrail]
  );

  /* ---- Handlers ---- */

  const handleStart = useCallback(() => {
    setWalkIndex(0);
    startAnimation(0);
  }, [startAnimation]);

  const handleNext = useCallback(() => {
    const next = walkIndex + 1;
    if (next < DEMO_WALKS.length) {
      removeMarker();
      setWalkIndex(next);
      startAnimation(next);
    }
  }, [walkIndex, removeMarker, startAnimation]);

  const handleReset = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    tilesRef.current = {};
    distRef.current = 0;
    removeMarker();
    updateFog({});
    updateTrail([]);
    setWalkIndex(-1);
    setPhase("ready");
    setTileCount(0);
    setDisplayDistance(0);
    mapRef.current?.flyTo({
      center: UW_CENTER,
      zoom: 13.5,
      duration: 1200,
    });
  }, [removeMarker, updateFog, updateTrail]);

  /* ---- Cleanup ---- */
  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  /* ---- Render ---- */
  return (
    <section className="px-6 py-24 max-w-5xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          See it in action
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          From solo walks to dog walks to group exploration. Watch how Roam
          grows with you.
        </p>
      </motion.div>

      {/* Map container */}
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] w-full"
        style={{
          // Use fixed pixel heights on mobile + svh on desktop to avoid
          // URL-bar viewport jumps on iOS/Android
          height: "min(480px, calc(100vw * 0.66))",
          maxHeight: "520px",
          minHeight: "360px",
          // Let vertical page scroll pass through the map on mobile
          touchAction: "pan-y",
        }}
      >
        {/* Map canvas — pointer-events-none ensures taps/drags don't hijack scrolling */}
        <div
          ref={containerRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Bottom fade gradient */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pointer-events-none" />

        {/* ---------- Intro overlay ---------- */}
        <AnimatePresence>
          {isIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <div className="absolute inset-0 bg-[#0a0a0a]/40" />
              <div className="relative z-10 text-center px-6">
                {/* Mini blob icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30" />
                <p className="text-xl sm:text-2xl font-semibold mb-2">
                  Watch how Roam reveals your world
                </p>
                <p className="text-gray-400 text-sm mb-8">
                  UW Seattle campus &mdash; 3 demo walks
                </p>
                <button
                  onClick={handleStart}
                  className="px-8 py-3 bg-amber-500 text-black font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-400/30 transition-all"
                >
                  Start Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- Summary overlay ---------- */}
        <AnimatePresence>
          {isSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <div className="absolute inset-0 bg-[#0a0a0a]/30" />
              <div className="relative z-10 text-center px-6">
                <p className="text-2xl sm:text-3xl font-bold mb-2">
                  Your campus, remembered
                </p>
                <p className="text-gray-400 mb-1 font-mono text-sm">
                  {tileCount} tiles revealed &middot;{" "}
                  {metersToMiles(displayDistance)} mi walked
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Every walk adds to your map
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 border border-white/10 text-sm text-gray-300 rounded-full hover:border-white/20 transition-colors"
                  >
                    Replay
                  </button>
                  <a
                    href="/app"
                    className="px-6 py-2.5 bg-amber-500 text-black text-sm font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
                  >
                    Try it yourself
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- Echo speech bubble ---------- */}
        <AnimatePresence>
          {currentWalk &&
            !isIntro &&
            !isSummary &&
            (phase === "animating" || phase === "done") && (
              <motion.div
                key={walkIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: phase === "animating" ? 1.8 : 0 }}
                className="absolute left-6 bottom-32 z-10 pointer-events-none"
              >
                <div className="flex items-start gap-2.5 max-w-xs">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0 shadow-md shadow-amber-500/20 mt-0.5" />
                  <div className="bg-white/[0.08] backdrop-blur-md rounded-xl rounded-tl-sm px-3.5 py-2 text-sm text-gray-300 leading-relaxed">
                    &ldquo;{currentWalk.echo}&rdquo;
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* ---------- Bottom controls bar ---------- */}
        {!isIntro && !isSummary && (
          <div className="absolute inset-x-0 bottom-0 p-5 z-10">
            <div className="flex items-center justify-between gap-4">
              {/* Step dots */}
              <div className="flex items-center gap-4">
                {DEMO_WALKS.map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < walkIndex
                          ? "bg-amber-400"
                          : i === walkIndex
                            ? "bg-amber-400 shadow-sm shadow-amber-400/50"
                            : "bg-white/20"
                      }`}
                    />
                    {i === walkIndex && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-gray-500 hidden sm:inline"
                      >
                        {w.name}
                      </motion.span>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="text-xs sm:text-sm text-gray-500 font-mono tabular-nums">
                {tileCount} tiles &middot;{" "}
                {metersToMiles(displayDistance)} mi
              </div>

              {/* Action button */}
              {phase === "animating" ? (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs text-amber-400/70">
                    Walking&hellip;
                  </span>
                </div>
              ) : phase === "done" &&
                walkIndex < DEMO_WALKS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-amber-500 text-black text-xs sm:text-sm font-semibold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Next Walk &rarr;
                </button>
              ) : null}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
