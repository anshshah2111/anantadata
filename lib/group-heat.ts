/**
 * Pure functions for merging multiple users' heat maps
 * and computing group/individual stats.
 */

/** Merge N individual heat maps into one group heat map (sum of visit counts) */
export function mergeHeatMaps(
  maps: Record<string, number>[]
): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const m of maps) {
    for (const [tileId, count] of Object.entries(m)) {
      merged[tileId] = (merged[tileId] || 0) + count;
    }
  }
  return merged;
}

/** Count unique tiles that only this member has touched */
export function uniqueTilesFor(
  memberMap: Record<string, number>,
  otherMaps: Record<string, number>[]
): number {
  const otherTiles = new Set<string>();
  for (const m of otherMaps) {
    for (const id of Object.keys(m)) {
      otherTiles.add(id);
    }
  }
  let unique = 0;
  for (const id of Object.keys(memberMap)) {
    if (!otherTiles.has(id)) unique++;
  }
  return unique;
}

/** Percent of group tiles this member contributed to */
export function percentOfGroup(
  memberMap: Record<string, number>,
  groupMap: Record<string, number>
): number {
  const groupTotal = Object.keys(groupMap).length;
  if (groupTotal === 0) return 0;
  const memberTiles = Object.keys(memberMap).length;
  return Math.round((memberTiles / groupTotal) * 100);
}
