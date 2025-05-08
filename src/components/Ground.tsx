
import { Grid, Plane } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface GroundProps {
  onGroundClick: (position: [number, number, number]) => void;
  isInteractive: boolean;
}

const Ground = ({ onGroundClick, isInteractive }: GroundProps) => {
  const handleGroundClick = (event: ThreeEvent<MouseEvent>) => {
    if (!isInteractive) return;
    
    // Get the point where the user clicked on the ground plane
    const point = event.point;
    // Round to 2 decimal places for cleaner coordinates
    const x = Math.round(point.x * 100) / 100;
    const z = Math.round(point.z * 100) / 100;
    
    // Pass the point to the parent component with y=1 (slight elevation)
    onGroundClick([x, 1, z]);
  };

  return (
    <>
      <Grid
        cellSize={1}
        cellThickness={0.6}
        cellColor="#6080ff"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#8080ff"
        fadeDistance={30}
        infiniteGrid
        position={[0, -0.01, 0]}
      />
      {/* Invisible plane for click detection */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.02, 0]}
        visible={false}
        onClick={handleGroundClick}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>
    </>
  );
};

export default Ground;
