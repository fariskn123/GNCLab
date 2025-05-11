
import React from "react";
import WaypointListItem from "./WaypointListItem";

type WaypointCoordinates = [number, number, number];

interface WaypointListProps {
  waypoints: WaypointCoordinates[];
  onRemoveWaypoint?: (index: number) => void;
  onUpdateWaypoint?: (index: number, coordinates: WaypointCoordinates) => void;
  disabled: boolean;
}

const WaypointList: React.FC<WaypointListProps> = ({
  waypoints,
  onRemoveWaypoint,
  onUpdateWaypoint,
  disabled,
}) => {
  return (
    <div className="max-h-40 overflow-y-auto">
      <h4 className="font-medium mb-2">Waypoints:</h4>
      {waypoints.length === 0 ? (
        <p className="text-gray-400 text-sm italic">No waypoints added yet</p>
      ) : (
        <ul className="space-y-1">
          {waypoints.map((waypoint, index) => (
            <WaypointListItem
              key={index}
              waypoint={waypoint}
              index={index}
              onRemoveWaypoint={onRemoveWaypoint}
              onUpdateWaypoint={onUpdateWaypoint}
              disabled={disabled}
              isStart={index === 0}
              isEnd={index === waypoints.length - 1}
              totalWaypoints={waypoints.length}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaypointList;
