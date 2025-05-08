
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { DroneStatus } from "./DroneControls";

interface WaypointsProps {
  waypoints: [number, number, number][];
  currentWaypointIndex?: number;
  status?: DroneStatus;
}

const Waypoints = ({ waypoints, currentWaypointIndex = 0, status = "idle" }: WaypointsProps) => {
  // Safety check for empty waypoints
  if (!waypoints || waypoints.length === 0) {
    return null;
  }
  
  return (
    <group>
      {/* Render waypoints as spheres */}
      {waypoints.map((position, index) => {
        // Determine if waypoint is completed
        const isCompleted = (status === "flying" && index < currentWaypointIndex) || 
                           (status === "returning" && index > currentWaypointIndex) ||
                           (status === "complete" && index !== 0);
        
        // Determine color based on position in sequence and completion status
        let color;
        if (isCompleted) {
          color = "#888888"; // Grey color for completed waypoints
        } else if (index === 0) {
          color = "#32CD32"; // Green for start
        } else if (index === waypoints.length - 1) {
          color = "#ea384c"; // Red for end
        } else {
          color = "#1EAEDB"; // Blue for midpoints
        }

        // Determine opacity and scale based on completion
        const opacity = isCompleted ? 0.5 : 1;
        const scale = isCompleted ? 0.8 : 1;

        return (
          <group key={index} position={position}>
            {/* Waypoint marker */}
            <mesh scale={scale}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={color} transparent opacity={opacity} />
            </mesh>
            
            {/* Waypoint number label position indicator */}
            <mesh position={[0, 0.6, 0]} scale={scale}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color={color} transparent opacity={opacity} />
            </mesh>
          </group>
        );
      })}
      
      {/* Path line connecting waypoints */}
      {waypoints.length > 1 && (
        <Line
          points={waypoints}
          color="#33C3F0"
          lineWidth={2}
          dashed={false}
        />
      )}
    </group>
  );
};

export default Waypoints;
