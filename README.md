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
