import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./WaypointForm";
import Bridge from "./Bridge";

// Define mission types
export type MissionMode = "construction" | "bridge" | "warehouse" | null;

// Initial default waypoints
const initialWaypoints: [number, number, number][] = [
  [0, 1, 0]
];

// Mission-specific waypoints could be defined here or imported from a separate file
const constructionWaypoints: [number, number, number][] = [
  [0, 1, 0],
  [5, 3, 0],
  [10, 5, 0],
  [10, 5, 5],
  [5, 3, 5],
  [0, 1, 5]
];

const bridgeWaypoints: [number, number, number][] = [
  [1, 5, 2],
  [4, 5, 2],
  [6, 5, 2],
  [9, 5, 2],
  [9, 5, 8],
  [6, 5, 8],
  [4, 5, 8],
  [1, 5, 8]
];

const warehouseWaypoints: [number, number, number][] = [
  [0, 3, 0],
  [5, 3, 0],
  [10, 3, 0],
  [10, 3, 5],
  [5, 3, 5],
  [0, 3, 5],
];

const DroneScene = ({ missionMode = null }: { missionMode?: MissionMode }) => {
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>(() => {
    // Initialize waypoints based on mission mode
    if (missionMode === "construction") return constructionWaypoints;
    if (missionMode === "bridge") return bridgeWaypoints;
    if (missionMode === "warehouse") return warehouseWaypoints;
    return initialWaypoints;
  });
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
    
    // Reset waypoints based on mission mode
    if (missionMode === "construction") {
      setWaypoints(constructionWaypoints);
    } else if (missionMode === "bridge") {
      setWaypoints(bridgeWaypoints);
    } else if (missionMode === "warehouse") {
      setWaypoints(warehouseWaypoints);
    } else {
      setWaypoints(initialWaypoints);
    }
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

  // New function to update a waypoint at a specific index
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

        {/* Only render mission-specific objects if a mission is selected */}
        {missionMode === "bridge" && <Bridge />}
        
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

// Bridge component for the bridge mission
const Bridge = () => {
  return (
    <>
      {/* Bridge deck */}
      <mesh 
        position={[5, 5, 5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[4, 2, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Pillars */}
      <mesh 
        position={[3, 5, 2.5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#8A898C" />
      </mesh>
      
      <mesh 
        position={[7, 5, 2.5]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#8A898C" />
      </mesh>
    </>
  );
};

export default DroneScene;
