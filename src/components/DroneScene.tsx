import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import DroneControls, { DroneStatus } from "./DroneControls";
import WaypointForm from "./WaypointForm";
import MissionObstacles from "./MissionObstacles";

// Define mission-specific waypoints using proper tuple typing
const missionWaypoints: Record<string, [number, number, number][]> = {
  sandbox: [
    [0, 1, 0]
  ],
  construction: [
    [0, 2, 0],  // Start point
    [3, 5, 0],  // Front corner
    [7, 5, 0],  // Front edge
    [7, 5, 5],  // Front edge high
    [7, 5, 0],  // Back down
    [7, 5, -3], // Back edge
    [3, 5, -3], // Back corner
    [0, 2, 0]   // Return to start
  ],
  waterway: [
    [0, 1, 5],   // Start point
    [-5, 3, 0],  // Bridge approach
    [-3, 2, 0],  // Over first support
    [0, 2, 0],   // Middle of bridge 
    [3, 2, 0],   // Over last support
    [5, 3, 0],   // Bridge exit
    [0, 0.5, 0], // Under bridge
    [0, 1, 5]    // Return to start
  ],
  warehouse: [
    [-8, 2, -8],   // Start point
    [-5, 4, -5],   // First corner
    [-5, 4, -3],   // First row
    [-5, 4, -1],
    [-5, 4, 1],
    [-5, 4, 3],
    [-5, 4, 5],    // End first row
    [-3, 4, 5],    // Move over
    [-3, 4, 3],    // Second row backward
    [-3, 4, 1],
    [-3, 4, -1],
    [-3, 4, -3],
    [-3, 4, -5],   // End second row
    [-1, 4, -5],   // Move over
    [-1, 4, -3],   // Third row forward
    [-1, 4, -1],
    [-1, 4, 1],
    [-1, 4, 3],
    [-1, 4, 5],    // End third row
    [1, 4, 5],     // Move over
    [1, 4, 3],     // Fourth row backward
    [1, 4, 1],
    [1, 4, -1],
    [1, 4, -3],
    [1, 4, -5],    // End fourth row
    [3, 4, -5],    // Move over
    [3, 4, -3],    // Fifth row forward
    [3, 4, -1],
    [3, 4, 1],
    [3, 4, 3],
    [3, 4, 5],     // End path
    [-8, 2, -8]    // Return to start
  ]
};

interface DroneSceneProps {
  missionType?: string;
}

const DroneScene = ({ missionType = "sandbox" }: DroneSceneProps) => {
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");
  const [waypoints, setWaypoints] = useState<[number, number, number][]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);

  // Load mission waypoints on mount or mission type change
  useEffect(() => {
    // Select waypoints based on mission type - ensure they are properly typed
    const initialPoints = missionWaypoints[missionType] || missionWaypoints.sandbox;
    setWaypoints([...initialPoints]); // Create a new array to ensure proper typing
    setDroneStatus("idle");
    setCurrentWaypointIndex(0);
  }, [missionType]);

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
    // Reset to initial waypoint for current mission
    const initialPoint = missionWaypoints[missionType] ? [missionWaypoints[missionType][0]] : [[0, 1, 0] as [number, number, number]];
    setWaypoints(initialPoint);
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
        <MissionObstacles missionType={missionType} />
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

export default DroneScene;
