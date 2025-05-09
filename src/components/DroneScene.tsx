
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./WaypointForm";
import { useMissionContext } from "@/context/MissionContext";

const DroneScene = () => {
  const { selectedMission } = useMissionContext();
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);

  // Load waypoints from context when component mounts
  useEffect(() => {
    setWaypoints(selectedMission);
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, [selectedMission]);

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
  };

  const handleAddWaypoint = (coordinates: [number, number, number]) => {
    setWaypoints([...waypoints, coordinates]);
  };

  const handleClearWaypoints = () => {
    setWaypoints([[0, 1, 0]]); // Reset to initial waypoint
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

  const isEditingDisabled = droneStatus !== "idle" && droneStatus !== "complete";

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      <Canvas shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={3} 
          maxDistance={20}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Scene Elements */}
        <Drone 
          status={droneStatus} 
          onStatusChange={setDroneStatus} 
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          setCurrentWaypointIndex={setCurrentWaypointIndex}
        />
        <Ground />
        <Waypoints 
          waypoints={waypoints} 
          currentWaypointIndex={currentWaypointIndex}
          status={droneStatus}
        />
        
        {/* Environment */}
        <Environment preset="city" />
        <SoftShadows />
      </Canvas>

      {/* Waypoint Form - Positioned at the top */}
      <div className="absolute top-6 left-6 max-w-md z-10">
        <WaypointForm 
          onAddWaypoint={handleAddWaypoint}
          onClearWaypoints={handleClearWaypoints}
          onRemoveWaypoint={handleRemoveWaypoint}
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
