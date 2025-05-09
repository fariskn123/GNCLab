
// Preset mission waypoints and obstacles for drone scenarios
// Format: [x, y, z] coordinates

export type MissionPreset = {
  name: string;
  description: string;
  waypoints: [number, number, number][];
  obstacles?: {
    position: [number, number, number];
    scale: [number, number, number];
    color: string;
  }[];
};

export const missionPresets: MissionPreset[] = [
  {
    name: "Construction Site Inspection",
    description: "Perimeter inspection of a construction site",
    waypoints: [
      [0, 1, 0],      // Start point
      [5, 1.5, 5],    // Corner 1
      [5, 2, -5],     // Corner 2
      [-5, 1.5, -5],  // Corner 3
      [-5, 1.8, 5],   // Corner 4
      [0, 1, 0]       // Return to start
    ],
    obstacles: [
      {
        position: [0, 0.5, 0],
        scale: [3, 1, 3],
        color: "#ea384c" // Red building
      },
      {
        position: [3, 0.5, 3],
        scale: [1, 1.5, 1],
        color: "#F97316" // Orange construction equipment
      }
    ]
  },
  {
    name: "Bridge Inspection",
    description: "Inspection of a bridge over water",
    waypoints: [
      [0, 1, 0],       // Start point
      [-8, 1.5, 0],    // Approach
      [-8, 0.5, 0],    // Under bridge
      [-4, 2, 0],      // Up to bridge level
      [0, 3, 0],       // Over bridge center
      [4, 2, 0],       // Down from bridge
      [8, 0.5, 0],     // Under other side
      [8, 1.5, 0],     // Past bridge
      [0, 1, 0]        // Return to start
    ],
    obstacles: [
      {
        position: [0, 1.5, 0],
        scale: [8, 0.3, 2],
        color: "#1EAEDB" // Blue bridge
      },
      {
        position: [-2, 0.8, 0],
        scale: [0.5, 1.6, 0.5],
        color: "#33C3F0" // Light blue pillar
      },
      {
        position: [2, 0.8, 0],
        scale: [0.5, 1.6, 0.5],
        color: "#33C3F0" // Light blue pillar
      }
    ]
  },
  {
    name: "Warehouse Roof Scan",
    description: "Grid pattern scan of a warehouse roof",
    waypoints: [
      [0, 1, 0],      // Start point
      [-6, 2.5, -6],  // Corner 1
      [-6, 2.5, -3],  // Row 1 - point 1
      [-3, 2.5, -3],  // Row 1 - point 2
      [-3, 2.5, -6],  // Row 2 - point 1
      [0, 2.5, -6],   // Row 2 - point 2
      [0, 2.5, -3],   // Row 3 - point 1
      [3, 2.5, -3],   // Row 3 - point 2
      [3, 2.5, -6],   // Row 4 - point 1
      [6, 2.5, -6],   // Row 4 - point 2
      [6, 2.5, -3],   // Corner 4
      [0, 1, 0]       // Return to start
    ],
    obstacles: [
      {
        position: [0, 0.5, -4.5],
        scale: [12, 1, 6],
        color: "#D3E4FD" // Light blue roof
      },
      {
        position: [2, 1.5, -4],
        scale: [1, 1, 1],
        color: "#E5DEFF" // Purple ventilation unit
      },
      {
        position: [-3, 1.2, -5],
        scale: [0.8, 0.3, 0.8],
        color: "#9E76FF" // Satellite dish
      }
    ]
  }
];
