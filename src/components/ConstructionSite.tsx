
import React from "react";
import { useSearchParams } from "react-router-dom";

const ConstructionSite: React.FC = () => {
  // Get mission type from URL to determine if we should show construction elements
  const [searchParams] = useSearchParams();
  const missionType = searchParams.get('mission') || 'construction';
  
  // Only render construction site elements if we're in construction mission
  if (missionType !== 'construction') {
    return null;
  }
  
  return (
    <group>
      {/* Main building - positioned so bottom is at y=0 */}
      <mesh position={[5, 2.5, 5]} castShadow receiveShadow>
        <boxGeometry args={[4, 5, 4]} />
        <meshStandardMaterial color="#8E9196" transparent opacity={0.85} />
      </mesh>
      
      {/* Equipment pile A */}
      <mesh position={[3, 0.5, 7]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#555555" transparent opacity={0.85} />
      </mesh>
      
      {/* Equipment pile B (crane base) */}
      <mesh position={[7, 0.5, 3]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

export default ConstructionSite;
