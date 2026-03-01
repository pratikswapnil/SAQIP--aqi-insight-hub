// data_service.js
const OPENAQ_API = "https://api.openaq.org/v2/latest";
// Proxy to bypass CORS errors on Vercel
const PROXY_URL = "https://api.allorigins.win/raw?url=";

// Restored to prevent import errors in components.js
export const MOCK_STATIONS = [
    { id: 'delhi-01', city: 'Delhi', aqi: 150, status: 'Moderate', pm25: 150.0, lat: 28.6139, lng: 77.2090 }
];

export async function fetchLiveIndianStations() {
    try {
        const targetUrl = `${OPENAQ_API}?country=IN&limit=50&parameter=pm25`;
        const response = await fetch(PROXY_URL + encodeURIComponent(targetUrl));
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        return data.results.map(result => {
            const pm25Val = result.measurements.find(m => m.parameter === 'pm25')?.value || 0;
            return {
                id: result.location,
                city: result.city || result.location,
                aqi: Math.round(pm25Val), 
                status: getAQICategory(pm25Val),
                pm25: pm25Val.toFixed(1),
                lat: result.coordinates.latitude,
                lng: result.coordinates.longitude
            };
        });
    } catch (error) {
        console.error("API Fetch Error - Using fallback:", error);
        return MOCK_STATIONS;
    }
}

export function getAQICategory(val) {
    if (val <= 30) return "Good";
    if (val <= 60) return "Satisfactory";
    if (val <= 90) return "Moderate";
    if (val <= 120) return "Poor";
    return "Very Poor";
}

export function getStatusColor(aqi) {
    if (aqi <= 50) return '#10B981';    
    if (aqi <= 100) return '#FBBF24';   
    if (aqi <= 200) return '#F97316';   
    if (aqi <= 300) return '#EF4444';   
    return '#7F1D1D';                   
}

export const HISTORICAL_DATA_MOCK = {
    'Delhi': Array.from({length: 7}, (_, i) => ({ date: `2026-02-${17 + i}`, 'PM2.5': 200 + Math.random() * 50 }))
};
