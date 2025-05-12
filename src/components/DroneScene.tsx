import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./waypoint/WaypointForm";
import ThreeScene from "./ThreeScene";
import { MissionType, getWaypointsForMission } from "./missions/missionData";

// Mission mode constant - set this to load different missions
const missionMode: MissionType = 'construction'; // Changed from null to 'construction'

const DroneScene = () => {
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>(getWaypointsForMission(missionMode));
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);

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
    setWaypoints(getWaypointsForMission(missionMode));
  };

  const handleAddWaypoint = (coordinates: [number, number, number]) => {
    setWaypoints([...waypoints, coordinates]);
  };

  const handleClearWaypoints = () => {
    setWaypoints(getWaypointsForMission(null)); // Reset to initial waypoint
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
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
          missionMode={missionMode}
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
        status={droneStatus}
        currentWaypointIndex={currentWaypointIndex}
        totalWaypoints={waypoints.length}
      />
    </div>
  );
};

export default DroneScene;
