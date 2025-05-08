
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, Flag, Trash2 } from "lucide-react";

// Define the possible drone states
export type DroneStatus = "idle" | "flying" | "returning" | "complete";

interface DroneControlsProps {
  onStart: () => void;
  onReset: () => void;
  onClearWaypoints: () => void;
  status: DroneStatus;
  waypointsCount: number;
}

const DroneControls = ({ onStart, onReset, onClearWaypoints, status, waypointsCount }: DroneControlsProps) => {
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

  // Determine if mission can be started (need at least 2 waypoints)
  const canStartMission = status === "idle" && waypointsCount >= 2;
  const canClearWaypoints = status === "idle" || status === "complete";

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 p-4 bg-gray-900/80 rounded-lg backdrop-blur-sm">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${statusColor[status]}`}></div>
        <span className="text-white font-medium">Status: {statusText[status]}</span>
        {status === "idle" && <span className="text-white font-medium ml-4">Waypoints: {waypointsCount}</span>}
      </div>
      
      {/* Instructional text */}
      {status === "idle" && waypointsCount < 2 && (
        <div className="text-white text-sm">
          Click on the grid to place waypoints (minimum 2 needed)
        </div>
      )}
      
      {/* Control buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={onStart} 
          disabled={!canStartMission}
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
          disabled={!canClearWaypoints || waypointsCount === 0}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Clear Waypoints
        </Button>
      </div>
    </div>
  );
};

export default DroneControls;
