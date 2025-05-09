
import { useEffect, useState } from "react";
import { useMissionContext } from "@/context/MissionContext";
import { Box } from "@react-three/drei";

const MissionObstacles = () => {
  const { selectedMission } = useMissionContext();
  const [missionType, setMissionType] = useState<string>("sandbox");

  useEffect(() => {
    // Determine the mission type from the selected waypoints
    if (selectedMission.length > 0) {
      const firstWaypoint = selectedMission[0];
      
      if (firstWaypoint[0] === 5 && firstWaypoint[1] === 5 && firstWaypoint[2] === 15) {
        setMissionType("construction");
      } else if (firstWaypoint[0] === 5 && firstWaypoint[1] === 10 && firstWaypoint[2] === 5) {
        setMissionType("bridge");
      } else if (firstWaypoint[0] === 5 && firstWaypoint[1] === 5 && firstWaypoint[2] === 20) {
        setMissionType("roof");
      } else {
        setMissionType("sandbox");
      }
    } else {
      setMissionType("sandbox");
    }
  }, [selectedMission]);

  // Construction site obstacles
  if (missionType === "construction") {
    return (
      <Box position={[10, 10, 5]} args={[5, 5, 10]} castShadow receiveShadow>
        <meshStandardMaterial color="#888888" transparent opacity={0.7} />
      </Box>
    );
  }

  // Bridge inspection obstacles
  if (missionType === "bridge") {
    return (
      <>
        {/* Left pillar */}
        <Box position={[10, 10, 5]} args={[1, 1, 10]} castShadow receiveShadow>
          <meshStandardMaterial color="#888888" transparent opacity={0.7} />
        </Box>
        
        {/* Right pillar */}
        <Box position={[20, 10, 5]} args={[1, 1, 10]} castShadow receiveShadow>
          <meshStandardMaterial color="#888888" transparent opacity={0.7} />
        </Box>
        
        {/* Bridge deck */}
        <Box position={[15, 10, 10]} args={[10, 2, 1]} castShadow receiveShadow>
          <meshStandardMaterial color="#888888" transparent opacity={0.7} />
        </Box>
      </>
    );
  }

  // Warehouse roof scan obstacles
  if (missionType === "roof") {
    return (
      <Box position={[10, 10, 2.5]} args={[20, 20, 5]} castShadow receiveShadow>
        <meshStandardMaterial color="#888888" transparent opacity={0.7} />
      </Box>
    );
  }

  // Sandbox mode - no obstacles
  return null;
};

export default MissionObstacles;
