
import { useRef, useEffect } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waypoints } from "./Waypoints";

const Drone = () => {
  const droneRef = useRef<Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  // Animation state
  const animationRef = useRef({
    time: 0,
    duration: 3, // seconds per segment
    currentIndex: 0,
    direction: 1, // 1 for forward, -1 for backward
    isReversing: false
  });
  
  // Calculate current position along the path
  useFrame((state, delta) => {
    if (!droneRef.current) return;
    
    const { time, duration, currentIndex, direction, isReversing } = animationRef.current;
    
    // Update time counter
    animationRef.current.time += delta;
    
    // Calculate progress along the current segment (0 to 1)
    const progress = Math.min(time / duration, 1);
    
    // Get current and target waypoint indices
    const targetIndex = isReversing ? 
      Math.max(0, currentIndex - direction) : 
      Math.min(waypoints.length - 1, currentIndex + direction);
      
    // Get current and next waypoint positions
    const currentWaypoint = waypoints[currentIndex];
    const targetWaypoint = waypoints[targetIndex];
    
    // Interpolate between waypoints based on progress
    const newX = THREE.MathUtils.lerp(currentWaypoint[0], targetWaypoint[0], progress);
    const newY = THREE.MathUtils.lerp(currentWaypoint[1], targetWaypoint[1], progress);
    const newZ = THREE.MathUtils.lerp(currentWaypoint[2], targetWaypoint[2], progress);
    
    // Update drone position
    droneRef.current.position.set(newX, newY, newZ);
    
    // Calculate direction vector for drone rotation
    if (currentIndex !== targetIndex) {
      const dirVector = new THREE.Vector3(
        targetWaypoint[0] - currentWaypoint[0],
        targetWaypoint[1] - currentWaypoint[1], 
        targetWaypoint[2] - currentWaypoint[2]
      ).normalize();
      
      // Only update rotation if we're moving (avoid NaN)
      if (dirVector.length() > 0.001) {
        // Create a rotation based on the direction vector
        const lookAt = new THREE.Vector3(
          currentWaypoint[0] + dirVector.x,
          currentWaypoint[1] + dirVector.y,
          currentWaypoint[2] + dirVector.z
        );
        droneRef.current.lookAt(lookAt);
      }
    }
    
    // Check if we need to move to the next waypoint
    if (progress >= 1) {
      // Reset timer
      animationRef.current.time = 0;
      
      // Update current index based on direction
      animationRef.current.currentIndex = targetIndex;
      
      // Check if we reached the end or start
      if (targetIndex === waypoints.length - 1 && !isReversing) {
        // Reached the end, start reversing
        animationRef.current.isReversing = true;
      } else if (targetIndex === 0 && isReversing) {
        // Reached the start again, go forward
        animationRef.current.isReversing = false;
      }
    }
    
    // Add a spinning animation to propellers
    if (bodyRef.current) {
      const propellerSpeed = 10;
      // Animate propellers in the group
      droneRef.current.children.forEach((child, i) => {
        if (i > 0) { // Skip the body (which is at index 0)
          const propeller = child.children[2]; // The propeller is the 3rd child in each arm group
          if (propeller) {
            propeller.rotation.y += propellerSpeed * delta;
          }
        }
      });
    }
  });

  return (
    <group ref={droneRef}>
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
