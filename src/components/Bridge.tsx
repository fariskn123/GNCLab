
import React from "react";

interface BridgeProps {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}

const Bridge: React.FC<BridgeProps> = () => {
  // Bridge deck properties
  const deckPosition: [number, number, number] = [5, 5, 5];
  const deckSize: [number, number, number] = [4, 2, 0.5];
  const deckColor = "#555555";
  
  // Pillar properties
  const pillarSize: [number, number, number] = [1, 1, 5];
  const pillarColor = "#333333";
  const pillar1Position: [number, number, number] = [3, 5, 2.5];
  const pillar2Position: [number, number, number] = [7, 5, 2.5];

  return (
    <group>
      {/* Bridge Deck */}
      <mesh 
        position={deckPosition} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={deckSize} />
        <meshStandardMaterial color={deckColor} />
      </mesh>

      {/* Bridge Pillars */}
      <mesh 
        position={pillar1Position} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={pillarSize} />
        <meshStandardMaterial color={pillarColor} />
      </mesh>
      <mesh 
        position={pillar2Position} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={pillarSize} />
        <meshStandardMaterial color={pillarColor} />
      </mesh>
    </group>
  );
};

export default Bridge;
