
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, Save, Check, Upload, Info } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// Define the possible drone states
export type DroneStatus = "idle" | "flying" | "returning" | "complete";

interface DroneControlsProps {
  onStart: () => void;
  onReset: () => void;
  onSave: () => void;
  status: DroneStatus;
  currentWaypointIndex: number;
  totalWaypoints: number;
  hasCustomWaypoints?: boolean;
  canSave?: boolean;
  isSandboxMode?: boolean;
}

const DroneControls = ({ 
  onStart, 
  onReset,
  onSave,
  status, 
  currentWaypointIndex,
  totalWaypoints,
  hasCustomWaypoints = false,
  canSave = true,
  isSandboxMode = false
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

  // Handler for CSV file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder only - for future integration
      console.log("CSV upload detected:", file.name);
      // Reset the input so the same file can be selected again
      event.target.value = '';
      
      toast({
        title: "CSV Upload Detected",
        description: `${file.name} received. Integration coming soon.`,
        duration: 3000
      });
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 p-4 bg-gray-900/80 rounded-lg backdrop-blur-sm">
      {/* Status indicator */}
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${statusColor[status]}`}></div>
        <span className="text-white font-medium">Status: {getStatusText()}</span>
        
        {/* Custom waypoints indicator */}
        {hasCustomWaypoints && canSave && (
          <div className="flex items-center gap-1 ml-3 bg-blue-500/20 px-2 py-0.5 rounded text-xs text-blue-300">
            <Check size={12} />
            <span>Custom Waypoints</span>
          </div>
        )}
      </div>
      
      {/* CSV Upload for Sandbox Mode Only */}
      {isSandboxMode && (
        <div className="w-full bg-gray-800/50 rounded-md p-3 mb-1">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <Label htmlFor="csv-upload" className="flex items-center gap-2 text-white">
                Upload Flight Log CSV (Coming Soon)
                <div className="bg-blue-500/20 px-2 py-0.5 rounded text-xs text-blue-300 flex items-center gap-1">
                  <Info size={12} />
                  <span>Integration in progress</span>
                </div>
              </Label>
              <div className="flex items-center gap-3 mt-2">
                <Input 
                  id="csv-upload"
                  type="file" 
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="text-sm text-white"
                />
              </div>
              <p className="text-gray-400 text-xs mt-1">Will's flight data support coming soon</p>
            </div>
          </div>
        </div>
      )}
      
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

        {canSave && (
          <Button 
            onClick={onSave}
            variant="secondary"
            disabled={status !== "idle" && status !== "complete"}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            Save Waypoints
          </Button>
        )}

        <Button 
          onClick={onReset}
          variant="outline"
          disabled={status === "idle" && !hasCustomWaypoints}
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
