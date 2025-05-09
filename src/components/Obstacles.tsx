
import React from "react";

interface ObstacleProps {
  obstacles?: {
    position: [number, number, number];
    scale: [number, number, number];
    color: string;
  }[];
}

const Obstacles: React.FC<ObstacleProps> = ({ obstacles = [] }) => {
  if (!obstacles || obstacles.length === 0) {
    return null;
  }

  return (
    <group>
      {obstacles.map((obstacle, index) => (
        <mesh 
          key={index} 
          position={obstacle.position}
          castShadow 
          receiveShadow
        >
          <boxGeometry args={obstacle.scale} />
          <meshStandardMaterial color={obstacle.color} />
        </mesh>
      ))}
    </group>
  );
};

export default Obstacles;
