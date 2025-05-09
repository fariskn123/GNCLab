
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import DroneScene from "@/components/DroneScene";
import { useMissionContext } from "@/context/MissionContext";

const Index = () => {
  const { selectedMission } = useMissionContext();
  
  // Determine the mission type from the selected waypoints
  const getMissionType = () => {
    // Simple detection based on first waypoint
    const firstWaypoint = selectedMission[0];
    if (!firstWaypoint) return "sandbox";
    
    if (firstWaypoint[0] === 5 && firstWaypoint[1] === 5 && firstWaypoint[2] === 15) {
      return "construction";
    } else if (firstWaypoint[0] === 5 && firstWaypoint[1] === 10 && firstWaypoint[2] === 5) {
      return "bridge";
    } else if (firstWaypoint[0] === 5 && firstWaypoint[1] === 5 && firstWaypoint[2] === 20) {
      return "roof";
    }
    
    return "sandbox";
  };
  
  const missionType = getMissionType();
  
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <DroneScene />
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="outline" asChild className="bg-black/50 hover:bg-black/70 border-gray-700">
          <Link to="/">
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      {/* Mission indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1.5 bg-black/50 text-white rounded-md border border-gray-700">
          Mission: {missionType.charAt(0).toUpperCase() + missionType.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default Index;
