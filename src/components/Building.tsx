
import React from "react";
import * as THREE from "three";

interface BuildingProps {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}

const Building: React.FC<BuildingProps> = ({ 
  position = [5, 5, 2.5], 
  size = [4, 4, 5],
  color = "#888888" 
}) => {
  return (
    <mesh 
      position={position} 
      castShadow 
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Building;
