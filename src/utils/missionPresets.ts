
// Define the waypoint type for better type safety
export type Waypoint = [number, number, number]; // [x, y, z]

// Mission preset definitions
export const missionPresets: Record<string, Waypoint[]> = {
  // Default empty sandbox mission
  sandbox: [[0, 1, 0]],
  
  // Construction site inspection mission preset
  construction: [
    [2, 1, 5], // Start/end point
    [8, 1, 5], // Right bottom corner
    [8, 9, 5], // Right top corner
    [2, 9, 5], // Left top corner
    [2, 1, 5]  // Return to start
  ],
};
