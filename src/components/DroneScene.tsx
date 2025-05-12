
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./waypoint/WaypointForm";
import ThreeScene from "./ThreeScene";
import { MissionType, getWaypointsForMission } from "./missions/missionData";
import { toast } from "./ui/use-toast";

interface DroneSceneProps {
  missionMode?: string;
}

const DroneScene = ({ missionMode = 'sandbox' }: DroneSceneProps) => {
  // Convert the string mission mode to our MissionType
  const validMissionMode = (
    missionMode === 'bridge' || 
    missionMode === 'construction' || 
    missionMode === 'warehouse'
  ) ? missionMode as MissionType : null;
  
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);
  const [usingCustomWaypoints, setUsingCustomWaypoints] = useState<boolean>(false);

  // Load waypoints based on mission type and check localStorage for saved waypoints
  useEffect(() => {
    loadWaypointsForMission(validMissionMode);
  }, [validMissionMode]);

  const loadWaypointsForMission = (missionType: MissionType) => {
    if (!missionType || missionType === null) {
      // In sandbox mode, just load default initial waypoint
      setWaypoints(getWaypointsForMission(null));
      setUsingCustomWaypoints(false);
      return;
    }

    // Check if we have saved waypoints for this mission
    const savedWaypointsKey = `waypoints_${missionType}`;
    const savedWaypoints = localStorage.getItem(savedWaypointsKey);
    
    if (savedWaypoints) {
      try {
        const parsedWaypoints = JSON.parse(savedWaypoints);
        setWaypoints(parsedWaypoints);
        setUsingCustomWaypoints(true);
      } catch (error) {
        console.error("Failed to load saved waypoints:", error);
        setWaypoints(getWaypointsForMission(missionType));
        setUsingCustomWaypoints(false);
      }
    } else {
      // No saved waypoints, use default ones
      setWaypoints(getWaypointsForMission(missionType));
      setUsingCustomWaypoints(false);
    }
  };

  const saveWaypointsToStorage = () => {
    if (validMissionMode) {
      const savedWaypointsKey = `waypoints_${validMissionMode}`;
      localStorage.setItem(savedWaypointsKey, JSON.stringify(waypoints));
      setUsingCustomWaypoints(true);
      toast({
        title: "Waypoints Saved",
        description: `Custom waypoints saved for ${validMissionMode} mission.`,
        duration: 3000
      });
    }
  };

  const handleStartMission = () => {
    if (waypoints.length >= 2) {
      setDroneStatus("flying");
      setCurrentWaypointIndex(0);
    } else {
      console.warn("Need at least 2 waypoints to start mission");
      // In a real app, you might want to show a user-facing message here
    }
  };

  const handleReset = () => {
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
    // Reset waypoints to initial state based on current mission mode
    loadWaypointsForMission(validMissionMode);
  };

  const handleSave = () => {
    saveWaypointsToStorage();
  };

  const handleAddWaypoint = (coordinates: [number, number, number]) => {
    const updatedWaypoints = [...waypoints, coordinates];
    setWaypoints(updatedWaypoints);
  };

  const handleClearWaypoints = () => {
    setWaypoints(getWaypointsForMission(null)); // Reset to initial waypoint
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
    
    // Remove saved waypoints for this mission if we're not in sandbox mode
    if (validMissionMode) {
      localStorage.removeItem(`waypoints_${validMissionMode}`);
      setUsingCustomWaypoints(false);
      toast({
        title: "Waypoints Cleared",
        description: `Custom waypoints removed for ${validMissionMode} mission.`,
        duration: 3000
      });
    }
  };

  const handleRemoveWaypoint = (index: number) => {
    if (droneStatus !== "idle" && droneStatus !== "complete") {
      console.warn("Cannot remove waypoints during mission");
      return;
    }

    // Do not allow removing the last waypoint
    if (waypoints.length <= 1) {
      return;
    }

    const updatedWaypoints = [...waypoints];
    updatedWaypoints.splice(index, 1);
    setWaypoints(updatedWaypoints);
  };

  const handleUpdateWaypoint = (index: number, coordinates: [number, number, number]) => {
    if (droneStatus !== "idle" && droneStatus !== "complete") {
      console.warn("Cannot update waypoints during mission");
      return;
    }

    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = coordinates;
    setWaypoints(updatedWaypoints);
  };

  const isEditingDisabled = droneStatus !== "idle" && droneStatus !== "complete";

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <Canvas shadows>
        <ThreeScene
          waypoints={waypoints}
          droneStatus={droneStatus}
          currentWaypointIndex={currentWaypointIndex}
          setCurrentWaypointIndex={setCurrentWaypointIndex}
          setDroneStatus={setDroneStatus}
          missionMode={validMissionMode}
        />
      </Canvas>

      {/* Waypoint Form - Positioned at the top */}
      <div className="absolute top-6 left-6 max-w-md z-10">
        <WaypointForm 
          onAddWaypoint={handleAddWaypoint}
          onClearWaypoints={handleClearWaypoints}
          onRemoveWaypoint={handleRemoveWaypoint}
          onUpdateWaypoint={handleUpdateWaypoint}
          waypoints={waypoints}
          disabled={isEditingDisabled}
        />
      </div>

      {/* Overlay UI Controls - Positioned at the bottom */}
      <DroneControls 
        onStart={handleStartMission} 
        onReset={handleReset}
        onSave={handleSave}
        status={droneStatus}
        currentWaypointIndex={currentWaypointIndex}
        totalWaypoints={waypoints.length}
        hasCustomWaypoints={usingCustomWaypoints}
        canSave={validMissionMode !== null}
      />
    </div>
  );
};

export default DroneScene;
