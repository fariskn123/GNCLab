
import DroneScene from "@/components/DroneScene";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <DroneScene />
      
      {/* Home button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
