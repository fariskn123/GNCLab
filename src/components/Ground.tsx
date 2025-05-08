
import { Grid } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface GroundProps {
  onGroundClick?: (position: [number, number, number]) => void;
  isInteractive: boolean;
}

const Ground = ({ onGroundClick, isInteractive = true }: GroundProps) => {
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isInteractive || !onGroundClick) return;
    
    e.stopPropagation();
    
    // Get the hit point and round to 1 decimal place for cleaner coordinates
    const x = Math.round(e.point.x * 10) / 10;
    const z = Math.round(e.point.z * 10) / 10;
    
    // Always place waypoints at a fixed height above the ground
    const y = 1;
    
    onGroundClick([x, y, z]);
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
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.02, 0]} 
        onClick={handleClick}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </>
  );
};

export default Ground;
