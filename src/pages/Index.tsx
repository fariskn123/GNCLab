
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import DroneScene from "@/components/DroneScene";

// Mission type to display name mapping
const missionDisplayNames: Record<string, string> = {
  'bridge': 'Bridge Over Waterway',
  'construction': 'Construction Site Inspection',
  'warehouse': 'Warehouse Roof Scan',
  'sandbox': 'Sandbox Mode'
};

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const missionParam = queryParams.get('mission') || 'sandbox';
  const missionName = missionDisplayNames[missionParam] || 'Sandbox Mode';
  
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <DroneScene missionMode={missionParam} />
      
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="outline" asChild className="bg-black/50 hover:bg-black/70 border-gray-700">
          <Link to="/">
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      {/* Mission indicator - based on URL parameter */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1.5 bg-black/50 text-white rounded-md border border-gray-700">
          Mission: {missionName}
        </div>
      </div>
    </div>
  );
};

export default Index;
