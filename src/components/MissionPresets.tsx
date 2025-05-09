
import React from "react";
import { Button } from "@/components/ui/button";
import { MissionPreset } from "@/data/missionPresets";

interface MissionPresetsProps {
  presets: MissionPreset[];
  onSelectMission: (mission: MissionPreset) => void;
  disabled: boolean;
}

const MissionPresets: React.FC<MissionPresetsProps> = ({ 
  presets, 
  onSelectMission,
  disabled
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Preset Missions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            onClick={() => onSelectMission(preset)}
            disabled={disabled}
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-left h-auto py-2"
          >
            <div>
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-gray-400">{preset.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MissionPresets;
