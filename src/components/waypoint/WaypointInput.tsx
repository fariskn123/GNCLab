
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

type WaypointCoordinates = [number, number, number];

interface WaypointInputProps {
  onAddWaypoint: (coordinates: WaypointCoordinates) => void;
  disabled: boolean;
}

const WaypointInput: React.FC<WaypointInputProps> = ({
  onAddWaypoint,
  disabled
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
    <>
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
      
      <div className="mb-4">
        <Button
          onClick={handleAddWaypoint}
          disabled={disabled}
          className="w-full"
        >
          <Plus size={16} className="mr-1" /> Add Waypoint
        </Button>
      </div>
    </>
  );
};

export default WaypointInput;
