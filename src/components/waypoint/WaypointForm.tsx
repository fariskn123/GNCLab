
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import WaypointInput from "./WaypointInput";
import WaypointList from "./WaypointList";

type WaypointCoordinates = [number, number, number];

interface WaypointFormProps {
  onAddWaypoint: (coordinates: WaypointCoordinates) => void;
  onClearWaypoints: () => void;
  onRemoveWaypoint?: (index: number) => void;
  onUpdateWaypoint?: (index: number, coordinates: WaypointCoordinates) => void;
  waypoints: WaypointCoordinates[];
  disabled: boolean;
}

const WaypointForm: React.FC<WaypointFormProps> = ({
  onAddWaypoint,
  onClearWaypoints,
  onRemoveWaypoint,
  onUpdateWaypoint,
  waypoints,
  disabled,
}) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg text-white w-full max-w-md">
      <h3 className="font-bold text-lg mb-4">Waypoint Controls</h3>
      
      {/* Input fields */}
      <WaypointInput 
        onAddWaypoint={onAddWaypoint}
        disabled={disabled}
      />
      
      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        <Button
          onClick={() => {}} // This is now handled in WaypointInput
          disabled={disabled}
          className="flex-1 opacity-0 pointer-events-none" // Hidden button to maintain layout
        >
          <Plus size={16} className="mr-1" /> Add Waypoint
        </Button>
        <Button
          onClick={onClearWaypoints}
          variant="outline"
          disabled={disabled || waypoints.length === 0}
          className="flex-1"
        >
          <Trash2 size={16} className="mr-1" /> Clear All
        </Button>
      </div>
      
      {/* Note about removing waypoints */}
      {waypoints.length > 1 && !disabled && (
        <p className="text-xs text-gray-400 mb-3 italic">
          Remove or edit waypoints before starting mission.
        </p>
      )}
      
      {/* Waypoints list */}
      <WaypointList 
        waypoints={waypoints}
        onRemoveWaypoint={onRemoveWaypoint}
        onUpdateWaypoint={onUpdateWaypoint}
        disabled={disabled}
      />
    </div>
  );
};

export default WaypointForm;
