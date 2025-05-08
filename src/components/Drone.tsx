
import { useRef } from "react";
import { Mesh, Group } from "three";

const Drone = () => {
  const droneRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);

  return (
    <group ref={droneRef} position={[0, 1, 0]}>
      {/* Drone Body */}
      <mesh ref={bodyRef} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#00ccff" />
      </mesh>

      {/* Drone Arms and Motors */}
      {[
        [-0.5, 0, -0.5],
        [0.5, 0, -0.5],
        [-0.5, 0, 0.5],
        [0.5, 0, 0.5]
      ].map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          {/* Arm */}
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          
          {/* Motor */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 12]} />
            <meshStandardMaterial color="#777777" />
          </mesh>
          
          {/* Propeller */}
          <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <boxGeometry args={[0.5, 0.01, 0.05]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Drone;
