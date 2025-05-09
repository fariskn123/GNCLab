
// Define the type for waypoints
export type Waypoint = [number, number, number]; // [x, y, z]

// Construction site inspection mission (rectangle pattern)
export const constructionMission: Waypoint[] = [
  [5, 5, 15],
  [15, 5, 15],
  [15, 15, 15],
  [5, 15, 15],
  [5, 5, 15]
];

// Bridge inspection mission (ascending path)
export const bridgeMission: Waypoint[] = [
  [5, 10, 5],
  [10, 10, 5],
  [15, 10, 10],
  [20, 10, 20],
  [25, 10, 25]
];

// Warehouse roof scan mission (rectangle pattern)
export const roofMission: Waypoint[] = [
  [5, 5, 20],
  [5, 15, 20],
  [15, 15, 20],
  [15, 5, 20],
  [5, 5, 20]
];

// Default starting waypoint for sandbox mode
export const sandboxMission: Waypoint[] = [
  [0, 1, 0]
];

// Map of mission names to their waypoint arrays for easy lookup
export const missionMap: Record<string, Waypoint[]> = {
  construction: constructionMission,
  bridge: bridgeMission,
  roof: roofMission,
  sandbox: sandboxMission
};
