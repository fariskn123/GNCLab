
import { Box } from "@react-three/drei";

interface MissionObstaclesProps {
  missionType: string;
}

const MissionObstacles = ({ missionType }: MissionObstaclesProps) => {
  if (missionType === 'construction') {
    return (
      <group>
        {/* Main building - centered at (5,5,2.5) with size 4x4x5 */}
        <Box args={[4, 5, 4]} position={[5, 2.5, 5]} castShadow receiveShadow>
          <meshStandardMaterial color="#a3a3a3" />
        </Box>
        
        {/* Construction equipment - smaller boxes inside building footprint */}
        <Box args={[1, 1, 1]} position={[3.5, 0.5, 3.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
        
        <Box args={[0.8, 2, 0.8]} position={[6.5, 1, 6.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#facc15" />
        </Box>
      </group>
    );
  }
  
  // Return null for sandbox mode or other missions
  return null;
};

export default MissionObstacles;
