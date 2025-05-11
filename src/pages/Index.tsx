
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import DroneScene, { MissionMode } from "@/components/DroneScene";

const Index = () => {
  // Get mission type from URL query parameters
  const [searchParams] = useSearchParams();
  const missionType = searchParams.get('mission') || 'sandbox';
  
  // Convert to MissionMode type
  const getMissionMode = (type: string): MissionMode => {
    if (type === 'construction' || type === 'bridge' || type === 'warehouse') {
      return type;
    }
    // Default to null (sandbox mode) for any other value
    return null;
  };
  
  const missionMode = getMissionMode(missionType);
  
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <DroneScene missionMode={missionMode} />
      
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
