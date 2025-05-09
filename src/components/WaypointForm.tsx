
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";

type WaypointCoordinates = [number, number, number];

interface WaypointFormProps {
  onAddWaypoint: (coordinates: WaypointCoordinates) => void;
  onClearWaypoints: () => void;
  onRemoveWaypoint?: (index: number) => void;
  waypoints: WaypointCoordinates[];
  disabled: boolean;
}

const WaypointForm: React.FC<WaypointFormProps> = ({
  onAddWaypoint,
  onClearWaypoints,
  onRemoveWaypoint,
  waypoints,
  disabled,
}) => {
  const [x, setX] = useState<string>("0");
  const [y, setY] = useState<string>("1");
  const [z, setZ] = useState<string>("0");

  const handleAddWaypoint = () => {
    const coordinates: WaypointCoordinates = [
      parseFloat(x) || 0,
      parseFloat(y) || 1,
      parseFloat(z) || 0,
    ];
    onAddWaypoint(coordinates);
    // Reset form after adding
    setX("0");
    setY("1");
    setZ("0");
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg text-white w-full max-w-md">
      <h3 className="font-bold text-lg mb-4">Waypoint Controls</h3>
      
      {/* Input fields */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <Label htmlFor="x-coord" className="text-white mb-1 block">X Coordinate</Label>
          <Input
            id="x-coord"
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            disabled={disabled}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="y-coord" className="text-white mb-1 block">Y Coordinate</Label>
          <Input
            id="y-coord"
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            disabled={disabled}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="z-coord" className="text-white mb-1 block">Z Coordinate</Label>
          <Input
            id="z-coord"
            type="number"
            value={z}
            onChange={(e) => setZ(e.target.value)}
            disabled={disabled}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        <Button
          onClick={handleAddWaypoint}
          disabled={disabled}
          className="flex-1"
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
          Remove waypoints before starting mission.
        </p>
      )}
      
      {/* Waypoints list */}
      <div className="max-h-40 overflow-y-auto">
        <h4 className="font-medium mb-2">Waypoints:</h4>
        {waypoints.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No waypoints added yet</p>
        ) : (
          <ul className="space-y-1">
            {waypoints.map((waypoint, index) => (
              <li key={index} className="text-sm flex items-center justify-between bg-gray-800/50 px-2 py-1 rounded">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full inline-block mr-2 ${
                    index === 0 ? "bg-green-500" : 
                    index === waypoints.length - 1 ? "bg-red-500" : 
                    "bg-blue-500"
                  }`}></span>
                  <span className="font-medium">{index === 0 ? "Start" : index === waypoints.length - 1 ? "End" : `Waypoint ${index}`}:</span>
                  <span className="ml-1">X={waypoint[0]}, Y={waypoint[1]}, Z={waypoint[2]}</span>
                </div>
                
                {/* Remove waypoint button */}
                {onRemoveWaypoint && !disabled && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => onRemoveWaypoint(index)}
                  >
                    <X size={14} />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WaypointForm;
