
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { defaultWaypoints } from "./Waypoints";
import { DroneStatus } from "./DroneControls";

interface DroneProps {
  status: DroneStatus;
  onStatusChange: (status: DroneStatus) => void;
}

const Drone = ({ status, onStatusChange }: DroneProps) => {
  const droneRef = useRef<Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  // Get access to the waypoints
  const waypointsRef = useRef<[number, number, number][]>([]);
  
  // Animation state
  const animationRef = useRef({
    time: 0,
    duration: 3, // seconds per segment
    currentIndex: 0,
    direction: 1, // 1 for forward, -1 for backward
    isReversing: false
  });

  // Reset the drone position and animation state
  const resetDrone = () => {
    if (droneRef.current) {
      const startPoint = defaultWaypoints[0];
      droneRef.current.position.set(startPoint[0], startPoint[1], startPoint[2]);
      
      // Reset animation state
      animationRef.current.time = 0;
      animationRef.current.currentIndex = 0;
      animationRef.current.isReversing = false;
    }
  };
  
  // Initialize drone position
  useFrame((state, delta) => {
    // Get the current scene waypoints from objects in the scene
    const waypointsObject = state.scene.children.find(child => 
      child.type === 'Group' && child.children.some(c => c.type === 'Line'));
      
    if (waypointsObject) {
      const line = waypointsObject.children.find(child => child.type === 'Line');
      if (line && (line as any).points) {
        waypointsRef.current = (line as any).points.map((p: THREE.Vector3) => [p.x, p.y, p.z]);
      }
    }
    
    // Initial positioning if needed
    if (status === "idle" && droneRef.current) {
      if (waypointsRef.current.length > 0) {
        const startPoint = waypointsRef.current[0];
        droneRef.current.position.set(startPoint[0], startPoint[1], startPoint[2]);
      } else {
        const startPoint = defaultWaypoints[0];
        droneRef.current.position.set(startPoint[0], startPoint[1], startPoint[2]);
      }
    }
    
    // Only animate when flying
    if (status !== "idle" && status !== "complete") {
      if (!droneRef.current || waypointsRef.current.length < 2) return;
      
      const { time, duration, currentIndex, direction, isReversing } = animationRef.current;
      const waypoints = waypointsRef.current;
      
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
      
      if (!currentWaypoint || !targetWaypoint) return;
      
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
          // Reached the end, start returning
          animationRef.current.isReversing = true;
          onStatusChange("returning");
        } else if (targetIndex === 0 && isReversing) {
          // Reached the start again, mission complete
          onStatusChange("complete");
        }
      }
    }
    
    // Always animate propellers when flying or returning
    if ((status === "flying" || status === "returning") && droneRef.current) {
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
