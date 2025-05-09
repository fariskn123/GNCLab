
// Mission type definition
export type MissionType = 'sandbox' | 'construction';

// Construction site inspection waypoint preset
// These waypoints form a path that circles the main building with safe clearance
export const constructionWaypoints: [number, number, number][] = [
  [0, 1, 0], // Starting point
  [1, 3, 1], // Rise to altitude
  [1, 3, 3], // Fly to corner 1
  [1, 3, 7], // Fly to corner 2
  [5, 3, 7], // Fly to corner 3
  [5, 3, 1], // Fly to corner 4
  [1, 3, 1], // Complete the loop
  [0, 1, 0]  // Return to starting point
];

// Get waypoints based on mission type
export const getWaypointsByMission = (missionType: MissionType): [number, number, number][] => {
  switch (missionType) {
    case 'construction':
      return [...constructionWaypoints];
    case 'sandbox':
    default:
      return [[0, 1, 0]]; // Default starting point only
  }
};
