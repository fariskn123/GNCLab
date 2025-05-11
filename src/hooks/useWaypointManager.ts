
import { useState, useCallback, useMemo } from 'react';
import { WaypointCoordinate, convertToSceneWaypoints, convertFromSceneWaypoints } from '@/data/missionPresets';

interface UseWaypointManagerProps {
  initialWaypoints: WaypointCoordinate[];
  isEditingDisabled: boolean;
}

export const useWaypointManager = ({ initialWaypoints, isEditingDisabled }: UseWaypointManagerProps) => {
  const [waypoints, setWaypoints] = useState<WaypointCoordinate[]>(initialWaypoints);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<WaypointCoordinate>({ x: 0, y: 1, z: 0 });

  // Convert waypoints to scene format
  const sceneWaypoints = useMemo(() => {
    return convertToSceneWaypoints(waypoints);
  }, [waypoints]);

  // Add waypoint
  const addWaypoint = useCallback((waypoint: WaypointCoordinate) => {
    if (isEditingDisabled) return;
    setWaypoints(prev => [...prev, waypoint]);
  }, [isEditingDisabled]);

  // Update waypoint
  const updateWaypoint = useCallback((index: number, waypoint: WaypointCoordinate) => {
    if (isEditingDisabled) return;
    setWaypoints(prev => {
      const updated = [...prev];
      updated[index] = waypoint;
      return updated;
    });
  }, [isEditingDisabled]);

  // Remove waypoint
  const removeWaypoint = useCallback((index: number) => {
    if (isEditingDisabled || waypoints.length <= 1) return;
    setWaypoints(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, [isEditingDisabled, waypoints.length]);

  // Clear all waypoints
  const clearWaypoints = useCallback(() => {
    if (isEditingDisabled) return;
    setWaypoints([{ x: 0, y: 1, z: 0 }]);
  }, [isEditingDisabled]);

  // Reset to initial waypoints
  const resetWaypoints = useCallback(() => {
    setWaypoints([...initialWaypoints]);
  }, [initialWaypoints]);

  // Start editing a waypoint
  const startEditing = useCallback((index: number) => {
    if (isEditingDisabled) return;
    setEditingIndex(index);
    setEditValues({ ...waypoints[index] });
  }, [isEditingDisabled, waypoints]);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setEditingIndex(null);
  }, []);

  // Save edited waypoint
  const saveEditing = useCallback(() => {
    if (editingIndex === null) return;
    updateWaypoint(editingIndex, editValues);
    setEditingIndex(null);
  }, [editingIndex, editValues, updateWaypoint]);

  // Update edit values
  const updateEditValue = useCallback((field: keyof WaypointCoordinate, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  }, []);

  return {
    waypoints,
    sceneWaypoints,
    editingIndex,
    editValues,
    setWaypoints,
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    clearWaypoints,
    resetWaypoints,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditValue
  };
};

export default useWaypointManager;
