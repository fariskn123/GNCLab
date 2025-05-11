
import React from "react";
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from "@react-three/drei";
import Drone from "./Drone";
import Ground from "./Ground";
import Waypoints from "./Waypoints";
import { DroneStatus } from "./DroneControls";
import MissionObjects from "./missions/MissionObjects";
import { MissionType } from "./missions/missionData";

interface ThreeSceneProps {
  waypoints: [number, number, number][];
  droneStatus: DroneStatus;
  currentWaypointIndex: number;
  setCurrentWaypointIndex: (index: number) => void;
  setDroneStatus: (status: DroneStatus) => void;
  missionMode: MissionType;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  waypoints,
  droneStatus,
  currentWaypointIndex,
  setCurrentWaypointIndex,
  setDroneStatus,
  missionMode
}) => {
  return (
    <>
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
      
      {/* Mission-specific objects */}
      <MissionObjects missionMode={missionMode} />
      
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
    </>
  );
};

export default ThreeScene;
