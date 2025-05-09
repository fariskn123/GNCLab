
import React from "react";
import { Box, Cylinder } from "@react-three/drei";

interface MissionObstaclesProps {
  missionType: string;
}

const MissionObstacles: React.FC<MissionObstaclesProps> = ({ missionType }) => {
  switch (missionType) {
    case "construction":
      return <ConstructionSiteObstacles />;
    case "waterway":
      return <WaterwayObstacles />;
    case "warehouse":
      return <WarehouseObstacles />;
    default:
      return null;
  }
};

// Construction site with a building and equipment
const ConstructionSiteObstacles = () => {
  return (
    <group>
      {/* Main building */}
      <Box 
        args={[4, 5, 4]} 
        position={[5, 2.5, 2.5]}
      >
        <meshStandardMaterial color="#bb8e51" />
      </Box>
      
      {/* Equipment boxes */}
      <Box 
        args={[1, 1, 1]} 
        position={[2, 0.5, 0]} 
      >
        <meshStandardMaterial color="#4a6fa5" />
      </Box>
      <Box 
        args={[1.5, 0.8, 1.2]} 
        position={[7, 0.4, 5]} 
      >
        <meshStandardMaterial color="#6c757d" />
      </Box>
      <Cylinder 
        args={[0.5, 0.5, 3, 16]} 
        position={[3, 1.5, 6]} 
        rotation={[0, 0, 0]} 
      >
        <meshStandardMaterial color="#e0a150" />
      </Cylinder>
    </group>
  );
};

// Waterway with bridge structure
const WaterwayObstacles = () => {
  return (
    <group>
      {/* Water plane */}
      <Box 
        args={[20, 0.1, 8]} 
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial color="#3498db" transparent opacity={0.8} />
      </Box>
      
      {/* Bridge structure */}
      <Box 
        args={[10, 0.5, 3]} 
        position={[0, 1, 0]} 
      >
        <meshStandardMaterial color="#7f8c8d" />
      </Box>
      
      {/* Bridge supports */}
      <Box 
        args={[0.8, 2, 0.8]} 
        position={[-4, 0, 0]} 
      >
        <meshStandardMaterial color="#7f8c8d" />
      </Box>
      <Box 
        args={[0.8, 2, 0.8]} 
        position={[0, 0, 0]} 
      >
        <meshStandardMaterial color="#7f8c8d" />
      </Box>
      <Box 
        args={[0.8, 2, 0.8]} 
        position={[4, 0, 0]} 
      >
        <meshStandardMaterial color="#7f8c8d" />
      </Box>
      
      {/* Bridge railings */}
      <Box 
        args={[10, 0.5, 0.2]} 
        position={[0, 1.5, 1.4]} 
      >
        <meshStandardMaterial color="#95a5a6" />
      </Box>
      <Box 
        args={[10, 0.5, 0.2]} 
        position={[0, 1.5, -1.4]} 
      >
        <meshStandardMaterial color="#95a5a6" />
      </Box>
    </group>
  );
};

// Warehouse with roof structure
const WarehouseObstacles = () => {
  return (
    <group>
      {/* Main warehouse structure */}
      <Box 
        args={[12, 0.5, 12]} 
        position={[0, 3, 0]} 
      >
        <meshStandardMaterial color="#7f8c8d" />
      </Box>
      
      {/* Warehouse walls */}
      <Box 
        args={[12, 3, 0.2]} 
        position={[0, 1.5, -6]} 
      >
        <meshStandardMaterial color="#bdc3c7" />
      </Box>
      <Box 
        args={[12, 3, 0.2]} 
        position={[0, 1.5, 6]} 
      >
        <meshStandardMaterial color="#bdc3c7" />
      </Box>
      <Box 
        args={[0.2, 3, 12]} 
        position={[-6, 1.5, 0]} 
      >
        <meshStandardMaterial color="#bdc3c7" />
      </Box>
      <Box 
        args={[0.2, 3, 12]} 
        position={[6, 1.5, 0]} 
      >
        <meshStandardMaterial color="#bdc3c7" />
      </Box>
      
      {/* Roof features */}
      <Cylinder 
        args={[0.5, 0.5, 1, 16]} 
        position={[-4, 3.5, -4]} 
        rotation={[0, 0, 0]} 
      >
        <meshStandardMaterial color="#e74c3c" />
      </Cylinder>
      <Box 
        args={[2, 0.5, 2]} 
        position={[3, 3.5, 3]} 
      >
        <meshStandardMaterial color="#3498db" />
      </Box>
      <Box 
        args={[1, 0.7, 3]} 
        position={[-2, 3.5, 0]} 
      >
        <meshStandardMaterial color="#95a5a6" />
      </Box>
    </group>
  );
};

export default MissionObstacles;
