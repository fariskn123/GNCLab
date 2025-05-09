
import React from "react";
import { useSearchParams } from "react-router-dom";

// Define mission types
export type MissionType = "sandbox" | "construction";

interface MissionObstaclesProps {}

const MissionObstacles: React.FC<MissionObstaclesProps> = () => {
  // Get mission type from URL query parameters
  const [searchParams] = useSearchParams();
  const missionType = searchParams.get('mission') || 'sandbox';
  
  // Only render obstacles for specific missions
  if (missionType === 'sandbox') {
    return null;
  }
  
  return (
    <group>
      {/* Construction site obstacles */}
      {missionType === 'construction' && (
        <>
          {/* Main building - positioned to sit on ground plane */}
          <mesh position={[5, 2.5, 5]} castShadow receiveShadow>
            <boxGeometry args={[4, 5, 4]} />
            <meshStandardMaterial color="#808080" transparent opacity={0.8} />
          </mesh>
          
          {/* Small construction equipment */}
          <mesh position={[3, 0.5, 3]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#5d5d5d" transparent opacity={0.8} />
          </mesh>
          
          {/* Crane base or another piece of equipment */}
          <mesh position={[7, 0.75, 7]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#5d5d5d" transparent opacity={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
};

export default MissionObstacles;
