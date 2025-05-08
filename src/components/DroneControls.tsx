
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, MapPin, Trash2 } from "lucide-react";

// Define the possible drone states
export type DroneStatus = "idle" | "flying" | "returning" | "complete";

interface DroneControlsProps {
  onStart: () => void;
  onReset: () => void;
  onClearWaypoints: () => void;
  status: DroneStatus;
  waypointCount: number;
}

const DroneControls = ({ 
  onStart, 
  onReset, 
  onClearWaypoints, 
  status, 
  waypointCount 
}: DroneControlsProps) => {
  // Map status to display text
  const statusText: Record<DroneStatus, string> = {
    idle: "Idle",
    flying: "Flying",
    returning: "Returning",
    complete: "Mission Complete"
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
        <span className="text-white font-medium">Status: {statusText[status]}</span>
        <span className="text-white font-medium ml-4">
          <MapPin size={16} className="inline mr-1" />
          Waypoints: {waypointCount}
        </span>
      </div>
      
      {/* Control buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={onStart} 
          disabled={status !== "idle" && status !== "complete" || waypointCount < 2}
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
        <Button 
          onClick={onClearWaypoints}
          variant="destructive"
          disabled={status !== "idle" && status !== "complete" || waypointCount === 0}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Clear Waypoints
        </Button>
      </div>

      {status === "idle" && waypointCount < 2 && (
        <div className="text-white text-sm mt-2">
          Click on the grid to place waypoints (minimum 2 required)
        </div>
      )}
    </div>
  );
};

export default DroneControls;
