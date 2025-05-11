
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Edit2, Check } from "lucide-react";

type WaypointCoordinates = [number, number, number];

interface WaypointListItemProps {
  waypoint: WaypointCoordinates;
  index: number;
  onRemoveWaypoint?: (index: number) => void;
  onUpdateWaypoint?: (index: number, coordinates: WaypointCoordinates) => void;
  disabled: boolean;
  isStart: boolean;
  isEnd: boolean;
  totalWaypoints: number;
}

const WaypointListItem: React.FC<WaypointListItemProps> = ({
  waypoint,
  index,
  onRemoveWaypoint,
  onUpdateWaypoint,
  disabled,
  isStart,
  isEnd,
  totalWaypoints,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<{x: string, y: string, z: string}>({
    x: waypoint[0].toString(),
    y: waypoint[1].toString(),
    z: waypoint[2].toString()
  });

  const startEditing = () => {
    setEditValues({
      x: waypoint[0].toString(),
      y: waypoint[1].toString(),
      z: waypoint[2].toString()
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = () => {
    const coordinates: WaypointCoordinates = [
      parseFloat(editValues.x) || 0,
      parseFloat(editValues.y) || 1,
      parseFloat(editValues.z) || 0
    ];
    
    if (onUpdateWaypoint) {
      onUpdateWaypoint(index, coordinates);
    }
    
    setIsEditing(false);
  };

  const handleEditInputChange = (field: 'x' | 'y' | 'z', value: string) => {
    setEditValues({
      ...editValues,
      [field]: value
    });
  };

  // Determine color based on position in sequence
  let indicatorColor = "bg-blue-500";
  if (isStart) indicatorColor = "bg-green-500";
  if (isEnd) indicatorColor = "bg-red-500";
  
  let waypointName = `Waypoint ${index}`;
  if (isStart) waypointName = "Start";
  if (isEnd) waypointName = "End";

  return (
    <li className="text-sm bg-gray-800/50 px-2 py-1 rounded">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          {/* Inline editing fields */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor={`edit-x-${index}`} className="text-xs text-white">X</Label>
              <Input
                id={`edit-x-${index}`}
                type="number"
                value={editValues.x}
                onChange={(e) => handleEditInputChange('x', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor={`edit-y-${index}`} className="text-xs text-white">Y</Label>
              <Input
                id={`edit-y-${index}`}
                type="number"
                value={editValues.y}
                onChange={(e) => handleEditInputChange('y', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor={`edit-z-${index}`} className="text-xs text-white">Z</Label>
              <Input
                id={`edit-z-${index}`}
                type="number"
                value={editValues.z}
                onChange={(e) => handleEditInputChange('z', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
              />
            </div>
          </div>
          {/* Save/Cancel buttons */}
          <div className="flex justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs" 
              onClick={cancelEditing}
            >
              <X size={14} className="mr-1" /> Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700" 
              onClick={saveEditing}
            >
              <Check size={14} className="mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full inline-block mr-2 ${indicatorColor}`}></span>
            <span className="font-medium">{waypointName}:</span>
            <span className="ml-1">X={waypoint[0]}, Y={waypoint[1]}, Z={waypoint[2]}</span>
          </div>
          
          {/* Edit and Remove buttons */}
          <div className="flex space-x-1">
            {!disabled && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={startEditing}
                >
                  <Edit2 size={14} />
                </Button>
                {onRemoveWaypoint && totalWaypoints > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => onRemoveWaypoint(index)}
                  >
                    <X size={14} />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default WaypointListItem;
