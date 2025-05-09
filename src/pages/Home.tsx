
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Factory, Warehouse, Edit3 } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-4 py-12">
      {/* Subtle background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      <div className="z-10 text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">GNCLab</h1>
        <h2 className="text-xl md:text-2xl text-gray-300 font-light mt-2">Guidance, Navigation, Control Lab</h2>
        <div className="mt-6 w-20 h-px bg-gray-700 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full z-10">
        <MissionCard 
          title="Construction Site Inspection"
          description="Perimeter survey of construction sites with obstacle detection"
          icon={<Construction className="h-8 w-8" />}
          missionType="construction"
        />
        
        <MissionCard 
          title="Bridge Over Waterway Inspection"
          description="Structural integrity scan of bridge components"
          icon={<Factory className="h-8 w-8" />}
          missionType="bridge"
        />
        
        <MissionCard 
          title="Warehouse Roof Scan"
          description="Grid pattern analysis for roof maintenance planning"
          icon={<Warehouse className="h-8 w-8" />}
          missionType="warehouse"
        />

        <MissionCard 
          title="Sandbox Mode"
          description="Create your own mission manually"
          icon={<Edit3 className="h-8 w-8" />}
          missionType="sandbox"
        />
      </div>
    </div>
  );
};

interface MissionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  missionType: string;
}

const MissionCard = ({ title, description, icon, missionType }: MissionCardProps) => {
  return (
    <Card className="bg-[#1A1A1A] border-gray-800 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#222] rounded-lg">
            {icon}
          </div>
          <CardTitle className="text-white text-lg md:text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#222] hover:bg-[#333] border border-gray-700" asChild>
          <Link to={`/simulator?mission=${missionType}`}>
            Select Mission
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Home;
