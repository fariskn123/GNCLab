
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";
import DroneScene from "@/components/DroneScene";

const Index = () => {
  // We're using the constant in DroneScene.tsx now, not URL parameters
  
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
      
      {/* Mission indicator - based on constant value in DroneScene.tsx */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-3 py-1.5 bg-black/50 text-white rounded-md border border-gray-700">
          Mission: Sandbox
        </div>
      </div>
    </div>
  );
};

export default Index;
