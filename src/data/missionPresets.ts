
/**
 * Mission preset waypoints configuration
 */

export interface WaypointCoordinate {
  x: number;
  y: number;
  z: number;
}

export type MissionPreset = {
  name: string;
  description: string;
  waypoints: WaypointCoordinate[];
};

export type MissionType = 'sandbox' | 'construction' | 'bridge' | 'warehouse';

// Predefined waypoint configurations for different mission types
const missionPresets: Record<MissionType, MissionPreset> = {
  sandbox: {
    name: 'Sandbox',
    description: 'Free-form flight with custom waypoints',
    waypoints: [{ x: 0, y: 1, z: 0 }] // Initial hovering position
  },
  construction: {
    name: 'Construction Site Inspection',
    description: 'Inspect the perimeter of a construction site',
    waypoints: [
      { x: 2, y: 1, z: 5 },
      { x: 8, y: 1, z: 5 },
      { x: 8, y: 9, z: 5 },
      { x: 2, y: 9, z: 5 },
      { x: 2, y: 1, z: 5 }
    ]
  },
  bridge: {
    name: 'Bridge Inspection',
    description: 'Inspect critical points of a bridge structure',
    waypoints: [
      { x: -5, y: 2, z: 0 },
      { x: 0, y: 4, z: 0 },
      { x: 5, y: 2, z: 0 },
      { x: 0, y: 3, z: -2 },
      { x: -5, y: 2, z: 0 }
    ]
  },
  warehouse: {
    name: 'Warehouse Inventory',
    description: 'Scan inventory in a warehouse environment',
    waypoints: [
      { x: 0, y: 3, z: 0 },
      { x: 5, y: 3, z: 5 },
      { x: 5, y: 3, z: -5 },
      { x: -5, y: 3, z: -5 },
      { x: -5, y: 3, z: 5 },
      { x: 0, y: 3, z: 0 }
    ]
  }
};

/**
 * Get waypoints for a specific mission type
 * @param missionType The type of mission to get waypoints for
 * @returns Array of waypoint coordinates
 */
export const getMissionWaypoints = (missionType: string): WaypointCoordinate[] => {
  const validMission = missionPresets[missionType as MissionType] 
    ? missionType as MissionType 
    : 'sandbox';
  
  return [...missionPresets[validMission].waypoints];
};

/**
 * Get mission information by type
 * @param missionType The type of mission
 * @returns Mission preset object or sandbox if not found
 */
export const getMissionInfo = (missionType: string): MissionPreset => {
  const validMission = missionPresets[missionType as MissionType] 
    ? missionType as MissionType 
    : 'sandbox';
  
  return missionPresets[validMission];
};

/**
 * Convert waypoint coordinates to the format expected by the 3D scene
 * @param waypoints Array of waypoint objects
 * @returns Array of three-number tuples [x, y, z]
 */
export const convertToSceneWaypoints = (waypoints: WaypointCoordinate[]): [number, number, number][] => {
  return waypoints.map(wp => [wp.x, wp.y, wp.z]);
};

/**
 * Convert scene waypoints back to waypoint coordinate objects
 * @param sceneWaypoints Array of three-number tuples [x, y, z]
 * @returns Array of waypoint coordinate objects
 */
export const convertFromSceneWaypoints = (sceneWaypoints: [number, number, number][]): WaypointCoordinate[] => {
  return sceneWaypoints.map(([x, y, z]) => ({ x, y, z }));
};
