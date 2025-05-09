
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X, Edit, Save, XCircle } from "lucide-react";

type WaypointCoordinates = [number, number, number];

interface WaypointFormProps {
  onAddWaypoint: (coordinates: WaypointCoordinates) => void;
  onClearWaypoints: () => void;
  onRemoveWaypoint?: (index: number) => void;
  onEditWaypoint?: (index: number, coordinates: WaypointCoordinates) => void;
  waypoints: WaypointCoordinates[];
  disabled: boolean;
}

const WaypointForm: React.FC<WaypointFormProps> = ({
  onAddWaypoint,
  onClearWaypoints,
  onRemoveWaypoint,
  onEditWaypoint,
  waypoints,
  disabled,
}) => {
  const [x, setX] = useState<string>("0");
  const [y, setY] = useState<string>("1");
  const [z, setZ] = useState<string>("0");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editX, setEditX] = useState<string>("0");
  const [editY, setEditY] = useState<string>("0");
  const [editZ, setEditZ] = useState<string>("0");

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

  const handleStartEdit = (index: number) => {
    const waypoint = waypoints[index];
    setEditX(waypoint[0].toString());
    setEditY(waypoint[1].toString());
    setEditZ(waypoint[2].toString());
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && onEditWaypoint) {
      const updatedCoordinates: WaypointCoordinates = [
        parseFloat(editX) || 0,
        parseFloat(editY) || 0,
        parseFloat(editZ) || 0,
      ];
      onEditWaypoint(editingIndex, updatedCoordinates);
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
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
      
      {/* Note about modifying waypoints */}
      {waypoints.length > 1 && !disabled && (
        <p className="text-xs text-gray-400 mb-3 italic">
          Edit or remove waypoints before starting mission.
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
              <li key={index} className="text-sm bg-gray-800/50 px-2 py-1 rounded">
                {editingIndex === index ? (
                  <div className="flex flex-col space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor={`edit-x-${index}`} className="text-xs text-gray-300">X:</Label>
                        <Input
                          id={`edit-x-${index}`}
                          type="number"
                          value={editX}
                          onChange={(e) => setEditX(e.target.value)}
                          className="h-7 text-xs bg-gray-700 border-gray-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-y-${index}`} className="text-xs text-gray-300">Y:</Label>
                        <Input
                          id={`edit-y-${index}`}
                          type="number"
                          value={editY}
                          onChange={(e) => setEditY(e.target.value)}
                          className="h-7 text-xs bg-gray-700 border-gray-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-z-${index}`} className="text-xs text-gray-300">Z:</Label>
                        <Input
                          id={`edit-z-${index}`}
                          type="number"
                          value={editZ}
                          onChange={(e) => setEditZ(e.target.value)}
                          className="h-7 text-xs bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={handleCancelEdit}
                      >
                        <XCircle size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-green-400 hover:text-green-500"
                        onClick={handleSaveEdit}
                      >
                        <Save size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full inline-block mr-2 ${
                        index === 0 ? "bg-green-500" : 
                        index === waypoints.length - 1 ? "bg-red-500" : 
                        "bg-blue-500"
                      }`}></span>
                      <span className="font-medium">{index === 0 ? "Start" : index === waypoints.length - 1 ? "End" : `Waypoint ${index}`}:</span>
                      <span className="ml-1">X={waypoint[0]}, Y={waypoint[1]}, Z={waypoint[2]}</span>
                    </div>
                    
                    {/* Edit and Remove buttons */}
                    {!disabled && (
                      <div className="flex">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => handleStartEdit(index)}
                        >
                          <Edit size={14} />
                        </Button>
                        {onRemoveWaypoint && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => onRemoveWaypoint(index)}
                          >
                            <X size={14} />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
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
