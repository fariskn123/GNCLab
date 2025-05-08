
import { Grid } from "@react-three/drei";

const Ground = () => {
  return (
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
  );
};

export default Ground;
