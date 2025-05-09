
import { Box } from "@react-three/drei";

const ConstructionSite = () => {
  return (
    <group>
      {/* Main building structure */}
      <Box args={[4, 4, 4]} position={[5, 2, 5]}>
        <meshStandardMaterial color="#666666" />
      </Box>
      
      {/* Construction equipment - container */}
      <Box args={[2, 1.5, 1.5]} position={[8, 0.75, 7.5]}>
        <meshStandardMaterial color="#2277aa" />
      </Box>
      
      {/* Small equipment box */}
      <Box args={[1, 0.8, 1]} position={[3, 0.4, 7.5]}>
        <meshStandardMaterial color="#aa5522" />
      </Box>
      
      {/* Crane base structure */}
      <Box args={[1.5, 0.5, 1.5]} position={[2, 0.25, 3]}>
        <meshStandardMaterial color="#dd7733" />
      </Box>
      <Box args={[0.5, 1.5, 0.5]} position={[2, 1.25, 3]}>
        <meshStandardMaterial color="#cc6622" />
      </Box>
    </group>
  );
};

export default ConstructionSite;
