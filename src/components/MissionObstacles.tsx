
import { useSearchParams } from "react-router-dom";
import * as THREE from "three";

const MissionObstacles = () => {
  const [searchParams] = useSearchParams();
  const missionType = searchParams.get('mission') || 'sandbox';
  
  if (missionType !== 'construction') {
    return null;
  }

  return (
    <group>
      {/* Main building */}
      <mesh position={[5, 2.5, 5]} castShadow receiveShadow>
        <boxGeometry args={[4, 5, 4]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Additional equipment 1 */}
      <mesh position={[3, 0.5, 7]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Additional equipment 2 */}
      <mesh position={[7, 0.5, 3]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
};

export default MissionObstacles;
