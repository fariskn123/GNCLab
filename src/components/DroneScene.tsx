
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./WaypointForm";
import ConstructionSite from "./ConstructionSite";

// Initial default waypoints for sandbox mode
const initialWaypoints: [number, number, number][] = [
  [0, 1, 0]
];

// Construction site inspection waypoints - form a rectangle around the main building
const constructionSiteWaypoints: [number, number, number][] = [
  [3, 5, 3],    // Start point - front left corner
  [3, 5, 7],    // Front right corner
  [7, 5, 7],    // Back right corner
  [7, 5, 3],    // Back left corner
  [3, 5, 3]     // Return to start point to complete the loop
];

interface DroneSceneProps {
  missionType?: string;
}

const DroneScene = ({ missionType = 'sandbox' }: DroneSceneProps) => {
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>(initialWaypoints);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);
  
  // Set appropriate waypoints based on mission type
  useEffect(() => {
    if (missionType === 'construction') {
      setWaypoints(constructionSiteWaypoints);
    } else {
      setWaypoints(initialWaypoints);
    }
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, [missionType]);

  const handleStartMission = () => {
    if (waypoints.length >= 2) {
      setDroneStatus("flying");
      setCurrentWaypointIndex(0);
    } else {
      console.warn("Need at least 2 waypoints to start mission");
    }
  };

  const handleReset = () => {
    // Reset back to mission defaults
    if (missionType === 'construction') {
      setWaypoints(constructionSiteWaypoints);
    } else {
      setWaypoints(initialWaypoints);
    }
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  };

  const handleAddWaypoint = (coordinates: [number, number, number]) => {
    setWaypoints([...waypoints, coordinates]);
  };

  const handleClearWaypoints = () => {
    setWaypoints(initialWaypoints); // Reset to initial waypoint
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

  // Function to update a waypoint at a specific index
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
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[5, 10, 15]} fov={50} />
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
        
        {/* Mission-specific scene elements */}
        {missionType === 'construction' && <ConstructionSite />}
        
        {/* Environment */}
        <Environment preset="city" />
        <SoftShadows />
      </Canvas>

      {/* Waypoint Form - Positioned at the top */}
      <div className="absolute top-20 left-6 max-w-md z-10">
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
