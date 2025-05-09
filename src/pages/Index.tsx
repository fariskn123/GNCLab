
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import DroneScene from "@/components/DroneScene";

const Index = () => {
  // Get mission type from URL query parameters
  const [searchParams] = useSearchParams();
  const missionType = searchParams.get('mission') || 'sandbox';
  
  // Get formatted mission name for display
  const getMissionName = () => {
    switch(missionType) {
      case 'construction':
        return "Construction Site Inspection";
      default:
        return "Sandbox";
    }
  };
  
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
          Mission: {getMissionName()}
        </div>
      </div>
    </div>
  );
};

export default Index;
