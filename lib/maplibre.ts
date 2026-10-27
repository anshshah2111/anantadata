import * as maplibregl from "maplibre-gl";

// maplibre-gl v6 spawns its tile worker from a separate module file, which
// Turbopack does not bundle. We copy that file into public/ at build time
// (see the "copy-map-worker" script) and point maplibre at it here.
const BASE_PATH = "/anantadata";
let configured = false;

export function configureMapWorker() {
  if (configured || typeof window === "undefined") return;
  maplibregl.setWorkerUrl(`${BASE_PATH}/maplibre/maplibre-gl-worker.mjs`);
  configured = true;
}

export { maplibregl };
