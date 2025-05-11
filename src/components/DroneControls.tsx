
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

// Define the possible drone states
export type DroneStatus = "idle" | "flying" | "returning" | "complete";

interface DroneControlsProps {
  onStart: () => void;
  onReset: () => void;
  status: DroneStatus;
  currentWaypointIndex: number;
  totalWaypoints: number;
}

const DroneControls = ({ 
  onStart, 
  onReset, 
  status, 
  currentWaypointIndex,
  totalWaypoints 
}: DroneControlsProps) => {
  // Map status to display text
  const getStatusText = (): string => {
    if (status === "idle") return "Ready for mission";
    if (status === "flying") {
      return `Flying to Waypoint ${currentWaypointIndex + 1} of ${totalWaypoints}`;
    }
    if (status === "returning") return "Returning to Start";
    if (status === "complete") return "Mission Complete";
    return "Unknown";
  };

  // Map status to colors
  const statusColor: Record<DroneStatus, string> = {
    idle: "bg-gray-500",
    flying: "bg-blue-500",
    returning: "bg-amber-500",
    complete: "bg-green-500"
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 p-4 bg-gray-900/80 rounded-lg backdrop-blur-sm">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${statusColor[status]}`}></div>
        <span className="text-white font-medium">Status: {getStatusText()}</span>
      </div>
      
      {/* Control buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={onStart} 
          disabled={status !== "idle" && status !== "complete"}
          className="flex items-center gap-2"
        >
          <Play size={16} />
          Start Mission
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          disabled={status === "idle"}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default DroneControls;
