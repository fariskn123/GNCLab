
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import DroneControls, { DroneStatus } from "./DroneControls";

const DroneScene = () => {
  const [droneStatus, setDroneStatus] = useState<DroneStatus>("idle");

  const handleStartMission = () => {
    setDroneStatus("flying");
  };

  const handleReset = () => {
    setDroneStatus("idle");
  };

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
        <Drone status={droneStatus} onStatusChange={setDroneStatus} />
        <Ground />
        <Waypoints />
        
        {/* Environment */}
        <Environment preset="city" />
        <SoftShadows />
      </Canvas>

      {/* Overlay UI Controls */}
      <DroneControls 
        onStart={handleStartMission} 
        onReset={handleReset}
        status={droneStatus}
      />
    </div>
  );
};

export default DroneScene;
