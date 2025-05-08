
import { Line } from "@react-three/drei";
import { Vector3 } from "three";

interface WaypointsProps {
  waypoints: [number, number, number][];
}

const Waypoints = ({ waypoints }: WaypointsProps) => {
  // Safety check for empty waypoints
  if (!waypoints || waypoints.length === 0) {
    return null;
  }
  
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
