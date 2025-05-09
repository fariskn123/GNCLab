
// Helper function to load flight data
// TODO: replace this function to fetch backend/CSV/API flight data when integration is ready
export const loadFlightData = (): [number, number, number][] => {
  // For now, this is just a wrapper that will be replaced with
  // actual data fetching logic in the future
  return window.waypointsData || [];
};

// This makes the waypoints data accessible globally for the loadFlightData function
// This avoids duplicating the data while allowing the function to access it
declare global {
  interface Window {
    waypointsData: [number, number, number][];
  }
}
