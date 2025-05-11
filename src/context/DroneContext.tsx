
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getMissionWaypoints, convertToSceneWaypoints, convertFromSceneWaypoints, WaypointCoordinate } from '@/data/missionPresets';

// Define the types for our drone state
export type DroneStatus = "idle" | "flying" | "returning" | "complete";

interface DroneContextType {
  // State
  droneStatus: DroneStatus;
  waypoints: [number, number, number][];
  currentWaypointIndex: number;
  missionType: string;
  
  // Actions
  setDroneStatus: (status: DroneStatus) => void;
  addWaypoint: (coordinates: [number, number, number]) => void;
  updateWaypoint: (index: number, coordinates: [number, number, number]) => void;
  removeWaypoint: (index: number) => void;
  clearWaypoints: () => void;
  resetMission: () => void;
  startMission: () => void;
  setMissionType: (type: string) => void;
  setCurrentWaypointIndex: (index: number) => void;
}

// Create the context with default values
const DroneContext = createContext<DroneContextType | undefined>(undefined);

// Context provider component
export const DroneProvider: React.FC<{children: ReactNode; initialMission?: string}> = ({ 
  children, 
  initialMission = 'sandbox'
}) => {
  const [missionType, setMissionType] = useState<string>(initialMission);
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);
  
  // Initialize waypoints based on mission type
  const [waypoints, setWaypoints] = useState<[number, number, number][]>(() => {
    const initialWaypoints = getMissionWaypoints(missionType);
    return convertToSceneWaypoints(initialWaypoints);
  });

  // Handle adding a new waypoint
  const addWaypoint = useCallback((coordinates: [number, number, number]) => {
    setWaypoints(prev => [...prev, coordinates]);
  }, []);

  // Handle updating a waypoint
  const updateWaypoint = useCallback((index: number, coordinates: [number, number, number]) => {
    if (droneStatus !== "idle" && droneStatus !== "complete") {
      console.warn("Cannot update waypoints during mission");
      return;
    }

    setWaypoints(prev => {
      const updated = [...prev];
      updated[index] = coordinates;
      return updated;
    });
  }, [droneStatus]);

  // Handle removing a waypoint
  const removeWaypoint = useCallback((index: number) => {
    if (droneStatus !== "idle" && droneStatus !== "complete") {
      console.warn("Cannot remove waypoints during mission");
      return;
    }

    // Do not allow removing the last waypoint
    setWaypoints(prev => {
      if (prev.length <= 1) {
        return prev;
      }
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, [droneStatus]);

  // Clear all waypoints and reset to initial position
  const clearWaypoints = useCallback(() => {
    const initialWaypoints = getMissionWaypoints('sandbox');
    setWaypoints(convertToSceneWaypoints(initialWaypoints));
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, []);

  // Reset mission to load preset waypoints based on mission type
  const resetMission = useCallback(() => {
    const missionWaypoints = getMissionWaypoints(missionType);
    setWaypoints(convertToSceneWaypoints(missionWaypoints));
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, [missionType]);

  // Start the drone mission
  const startMission = useCallback(() => {
    if (waypoints.length >= 2) {
      setDroneStatus("flying");
      setCurrentWaypointIndex(0);
    } else {
      console.warn("Need at least 2 waypoints to start mission");
    }
  }, [waypoints.length]);

  // When mission type changes, reload the waypoints
  const handleSetMissionType = useCallback((type: string) => {
    setMissionType(type);
    const missionWaypoints = getMissionWaypoints(type);
    setWaypoints(convertToSceneWaypoints(missionWaypoints));
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, []);

  // Create the context value object
  const contextValue: DroneContextType = {
    droneStatus,
    waypoints,
    currentWaypointIndex,
    missionType,
    setDroneStatus,
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    clearWaypoints,
    resetMission,
    startMission,
    setMissionType: handleSetMissionType,
    setCurrentWaypointIndex
  };

  return (
    <DroneContext.Provider value={contextValue}>
      {children}
    </DroneContext.Provider>
  );
};

// Custom hook for using the drone context
export const useDrone = (): DroneContextType => {
  const context = useContext(DroneContext);
  if (context === undefined) {
    throw new Error('useDrone must be used within a DroneProvider');
  }
  return context;
};
