
import { WaypointCoordinates } from "../waypoint/types";

// Initial default waypoints
export const initialWaypoints: WaypointCoordinates[] = [
  [0, 1, 0]
];

// Bridge mission waypoints
export const bridgeMission: WaypointCoordinates[] = [
  [1, 5, 2],
  [4, 5, 2],
  [6, 5, 2],
  [9, 5, 2],
  [9, 5, 8],
  [6, 5, 8],
  [4, 5, 8],
  [1, 5, 8]
];

// Construction mission waypoints
export const constructionMission: WaypointCoordinates[] = [
  [2, 2, 6],
  [8, 2, 6],
  [8, 8, 6],
  [2, 8, 6],
  [2, 2, 6]
];

export type MissionType = 'construction' | 'bridge' | 'warehouse' | null;

// Function to get waypoints based on mission type
export const getWaypointsForMission = (missionType: MissionType): WaypointCoordinates[] => {
  switch (missionType) {
    case 'bridge':
      return bridgeMission;
    case 'construction':
      return constructionMission;
    // Add other mission types here as needed
    default:
      return initialWaypoints;
  }
};
