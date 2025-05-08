
import { Line } from "@react-three/drei";
import { Vector3 } from "three";

// Define waypoint positions
export const waypoints = [
  [0, 1, 0],      // Start point (at drone's initial position)
  [3, 2, 3],      // Midpoint 1
  [0, 3, 5],      // Midpoint 2
  [-4, 2, 2],     // Midpoint 3
  [-2, 1, -2]     // End point
] as [number, number, number][];

const Waypoints = () => {
  return (
    <group>
      {/* Render waypoints as spheres */}
      {waypoints.map((position, index) => {
        // Determine color based on position in sequence
        let color;
        if (index === 0) {
          color = "#32CD32"; // Green for start
        } else if (index === waypoints.length - 1) {
          color = "#ea384c"; // Red for end
        } else {
          color = "#1EAEDB"; // Blue for midpoints
        }

        return (
          <group key={index} position={position}>
            {/* Waypoint marker */}
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Waypoint number label position indicator */}
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );
      })}
      
      {/* Path line connecting waypoints */}
      <Line
        points={waypoints}
        color="#33C3F0"
        lineWidth={2}
        dashed={false}
      />
    </group>
  );
};

export default Waypoints;
