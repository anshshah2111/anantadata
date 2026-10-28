/**
 * Basemap for every Roam map.
 *
 * CARTO's free raster tiles now stamp "API KEY REQUIRED" across every tile,
 * so we use OpenFreeMap's dark vector style instead: free, no key, no usage
 * limits, and its attribution (OpenFreeMap, OpenMapTiles, OpenStreetMap) is
 * carried in the style itself.
 */
export const BASEMAP_STYLE = "https://tiles.openfreemap.org/styles/dark";
