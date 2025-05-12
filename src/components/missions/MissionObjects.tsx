
import React from "react";
import { MissionType } from "./missionData";

interface MissionObjectsProps {
  missionMode: MissionType;
}

const MissionObjects: React.FC<MissionObjectsProps> = ({ missionMode }) => {
  return (
    <>
      {/* Bridge visualization */}
      {missionMode === 'bridge' && (
        <group>
          {/* Bridge deck */}
          <mesh position={[5, 5, 5]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 0.5]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          
          {/* Bridge pillars */}
          <mesh position={[3, 5, 2.5]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 5]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
          <mesh position={[7, 5, 2.5]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 5]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        </group>
      )}
      
      {/* Construction site visualization */}
      {missionMode === 'construction' && (
        <group>
          {/* Building - 4x4x5 cube centered at (5,5,2.5) */}
          <mesh position={[5, 5, 2.5]} castShadow receiveShadow>
            <boxGeometry args={[4, 4, 5]} />
            <meshStandardMaterial color="#8A898C" /> {/* Medium gray color */}
          </mesh>
        </group>
      )}
      
      {/* Warehouse visualization */}
      {missionMode === 'warehouse' && (
        <group>
          {/* Warehouse building - 6x6x3 cube centered at (5,5,1.5) */}
          <mesh position={[5, 5, 1.5]} castShadow receiveShadow>
            <boxGeometry args={[6, 6, 3]} /> {/* 6x6m footprint, 3m tall */}
            <meshStandardMaterial color="#9F9EA1" /> {/* Light gray color for the warehouse */}
          </mesh>
        </group>
      )}
    </>
  );
};

export default MissionObjects;
