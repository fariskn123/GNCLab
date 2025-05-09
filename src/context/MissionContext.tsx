
import React, { createContext, useContext, useState } from 'react';
import { Waypoint, sandboxMission } from '@/data/missions';

// Define the context shape
type MissionContextType = {
  selectedMission: Waypoint[];
  setSelectedMission: (waypoints: Waypoint[]) => void;
};

// Create the context with default values
const MissionContext = createContext<MissionContextType>({
  selectedMission: sandboxMission,
  setSelectedMission: () => {},
});

// Create a provider component
export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMission, setSelectedMission] = useState<Waypoint[]>(sandboxMission);

  return (
    <MissionContext.Provider value={{ selectedMission, setSelectedMission }}>
      {children}
    </MissionContext.Provider>
  );
};

// Create a custom hook for easy context consumption
export const useMissionContext = () => useContext(MissionContext);
