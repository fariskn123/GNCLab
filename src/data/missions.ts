
// Define waypoint types for consistent usage across the application
export type Waypoint = [number, number, number]; // [x, y, z]
export type MissionWaypoints = Waypoint[];

// Construction mission path - fly in a square pattern at 15 meters height
export const constructionMission: MissionWaypoints = [
  [0, 0, 15],
  [10, 0, 15],
  [10, 10, 15],
  [0, 10, 15],
  [0, 0, 15]
];

// Bridge inspection mission - gradually increasing altitude along a straight path
export const bridgeMission: MissionWaypoints = [
  [0, 0, 5],
  [15, 0, 5],
  [30, 0, 10],
  [45, 0, 20],
  [60, 0, 25]
];

// Roof inspection mission - rectangular pattern with multiple passes
export const roofMission: MissionWaypoints = [
  [0, 0, 20],
  [0, 20, 20],
  [10, 20, 20],
  [10, 0, 20],
  [20, 0, 20],
  [20, 20, 20]
];

// Default sandbox mode - starts with a single waypoint
export const sandboxMission: MissionWaypoints = [
  [0, 1, 0]
];

// Map mission names to their waypoint arrays for easy lookup
export const missionMap: Record<string, MissionWaypoints> = {
  construction: constructionMission,
  bridge: bridgeMission,
  roof: roofMission,
  sandbox: sandboxMission
};
