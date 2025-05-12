# GNCLab

**GNCLab** is an interactive 3D sandbox for prototyping drone navigation, inspection, and guidance algorithms. It’s designed as a lightweight visual simulator focused on Guidance, Navigation, and Control (GNC) workflows—ideal for testing mission patterns and validating control logic.

## Features

- **Customizable Flight Paths** – Manually create, edit, and remove waypoints in real-time.
-  **Preset Missions** – Includes predefined demo missions:
  - Construction Site Perimeter Inspection
  - Bridge Over Waterway Flythrough
  - Warehouse Roof Scan
-  **MVP Sandbox Mode** – Freely build and visualize custom flight patterns.
-  **CSV Integration Ready** – Designed to load real-world flight log data (integration in progress).

##  Tech Stack

- Built with AI assisted dev
- 3D rendering powered by **WebGL / Three.js** abstractions
- Lightweight, runs entirely in-browser
- No backend or server required

##  Use Cases

- Visual testing of PID/Kalman-based flight control outputs
- Educational tool for understanding GNC systems
- Demo platform for inspection missions over simulated infrastructure

##  Development Setup

1. Clone this repo
2. In `DroneScene.tsx`, set the desired mission mode:

```ts
const missionMode: MissionType = 'construction';
// Options: 'construction' | 'bridge' | 'warehouse' | null (sandbox)

## **GNCLab Architecture Overview**
1. Application Structure

GNCLab is a React-based web application focused on drone flight path simulation with several pre-defined missions. The architecture follows a component-based structure with clean separation of concerns:

Component Hierarchy

App
├── BrowserRouter
│   ├── Home (/)
│   │   └── MissionCard (Select mission type)
│   ├── Index (/simulator)
│   │   └── DroneScene
│   │       ├── Canvas (Three.js container)
│   │       │   └── ThreeScene
│   │       │       ├── Drone
│   │       │       ├── Ground
│   │       │       ├── Waypoints
│   │       │       └── MissionObjects
│   │       ├── WaypointForm (UI Controls)
│   │       │   ├── WaypointInput
│   │       │   └── WaypointList
│   │       └── DroneControls (UI Controls)
│   └── NotFound (*)
└── UI Components (Toaster, QueryProvider, etc.)
2. Key Components & Responsibilities

Front-End Layer

Home.tsx: Landing page showing mission selection cards
Index.tsx: Main simulator page that loads the mission based on URL parameters
DroneScene.tsx: Core component that coordinates the 3D scene and UI elements
3D Rendering Layer

ThreeScene.tsx: Sets up the Three.js scene with camera, lighting, and core components
Drone.tsx: Handles drone visualization and flight animation logic
Waypoints.tsx: Visualizes waypoints in 3D space
MissionObjects.tsx: Renders different mission-specific 3D objects (bridge, construction site, warehouse)
Control & Interaction Layer

WaypointForm.tsx: UI for adding/editing waypoints in the flight path
DroneControls.tsx: UI for mission control (start, reset, save waypoints)
WaypointList.tsx: Displays and allows editing of waypoint coordinates
Data Management Layer

missionData.ts: Contains preset waypoints for different mission types
localStorage: Persists custom waypoint configurations for each mission
3. Data Flow

┌─────────────┐     ┌─────────────┐      ┌──────────────┐
│ URL Params  │────▶│ Index.tsx   │─────▶│ DroneScene   │
└─────────────┘     └─────────────┘      └──────┬───────┘
                                                │
                                                ▼
┌─────────────┐     ┌─────────────┐      ┌──────────────┐
│ localStorage │◀───▶│ missionData │◀────▶│ Waypoints    │
└─────────────┘     └─────────────┘      └──────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌─────────────┐      ┌──────────────┐
│ User Input  │────▶│ WaypointForm│─────▶│ Drone Flight │
└─────────────┘     └─────────────┘      └──────────────┘
4. State Management

The application uses React's built-in state management with hooks:

DroneStatus: Tracks drone flight status (idle, flying, returning, complete)
Waypoints: Stores the current mission's waypoint coordinates
Current Waypoint Index: Tracks the drone's progress through waypoints
Custom Waypoints Flag: Indicates if using default or user-modified waypoints
5. Technologies Used

React & TypeScript: Core application framework
Three.js / React Three Fiber: 3D visualization engine
React Router: Navigation and routing
LocalStorage API: Persistence of custom waypoints
Tailwind CSS / Shadcn UI: Styling and UI components
6. Mission Types

The application supports four mission types:

Construction Site Inspection: Perimeter survey pattern
Bridge Over Waterway Inspection: Inspection of bridge structure
Warehouse Roof Scan: Zig-zag grid pattern for roof inspection
Sandbox Mode: Custom waypoint creation without preset structure
Architecture Diagram

┌────────────────────────────────────────────────────────────────────────┐
│                             User Interface                             │
│                                                                        │
│  ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌──────────┐ │
│  │  Mission   │     │  Waypoint  │     │   Drone    │     │  Upload  │ │
│  │  Selection │     │    Form    │     │  Controls  │     │   CSV    │ │
│  └────────────┘     └────────────┘     └────────────┘     └──────────┘ │
└───────────────────────────┬────────────────────────────────────────────┘
                            │
                            │ State Props
                            ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Application Logic                              │
│                                                                        │
│  ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌──────────┐ │
│  │  Waypoint  │     │   Mission  │     │ Navigation │     │ Local    │ │
│  │ Management │     │  Selection │     │   Logic   │     │ Storage  │ │
│  └────────────┘     └────────────┘     └────────────┘     └──────────┘ │
└───────────────────────────┬────────────────────────────────────────────┘
                            │
                            │ Props
                            ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Three.js Scene                               │
│                                                                        │
│  ┌────────────┐     ┌────────────┐     ┌────────────┐     ┌──────────┐ │
│  │    Drone   │     │  Waypoints │     │  Mission   │     │  Ground  │ │
│  │  Component │     │ Visualizer │     │  Objects   │     │   Plane  │ │
│  └────────────┘     └────────────┘     └────────────┘     └──────────┘ │
└────────────────────────────────────────────────────────────────────────┘
Future Extensions

The architecture is designed to be extended with:

CSV Integration: The UI framework is already in place for uploading flight log data in sandbox mode
Additional Missions: New mission types can be added by extending missionData.ts and MissionObjects.tsx
Enhanced Drone Models: The existing drone component can be replaced with more detailed 3D models
Simulation Parameters: Additional controls could be added for drone speed, altitude constraints, etc.


