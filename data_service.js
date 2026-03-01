// data_service.js
const PROXY = "https://api.allorigins.win/raw?url=";
const OPENAQ_API = "https://api.openaq.org/v2/latest?country=IN&limit=50";

export async function fetchLiveStationData() {
    try {
        const response = await fetch(`${PROXY}${encodeURIComponent(OPENAQ_API)}`);
        const data = await response.json();
        
        // Transform OpenAQ format to SAQIP format
        return data.results.map(station => ({
            id: station.location,
            city: station.city || "Unknown",
            // Find PM2.5 value specifically
            pm25: station.measurements.find(m => m.parameter === 'pm25')?.value || 0,
            aqi: calculateNAQI(station.measurements), // Your custom logic for NAQI
            lat: station.coordinates.latitude,
            lng: station.coordinates.longitude,
            lastUpdated: station.measurements[0]?.lastUpdated
        }));
    } catch (error) {
        console.error("Data Fetch Error:", error);
        return []; 
    }
}

// Logic to translate raw concentration to Indian National AQI
function calculateNAQI(measurements) {
    // This is where your core logic from the blueprint comes in
    // Translating raw concentrations into health advisories
    return 150; // Placeholder for calculation logic
}
