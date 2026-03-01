// data_service.js
const OPENAQ_API = "https://api.openaq.org/v2/latest";
// Proxy to bypass CORS errors on Vercel
const PROXY_URL = "https://api.allorigins.win/raw?url=";

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
                lng: result.coordinates.longitude,
                lastUpdated: result.measurements[0].lastUpdated
            };
        });
    } catch (error) {
        console.error("API Fetch Error - Falling back to local data:", error);
        // Fallback to a single mock entry to prevent a blank map
        return [{
            id: 'delhi-fallback', city: 'Delhi (Live Data Pending)', aqi: 150, 
            status: 'Moderate', pm25: '150.0', lat: 28.6139, lng: 77.2090
        }];
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
    if (aqi <= 400) return '#7E22CE';   
    return '#7F1D1D';                   
}

export const HISTORICAL_DATA_MOCK = {
    'Delhi': generateMockTimeSeries(250, 60),
    'Mumbai': generateMockTimeSeries(150, 40),
    'Bengaluru': generateMockTimeSeries(80, 20),
    'Chennai': generateMockTimeSeries(90, 25),
    'Kolkata': generateMockTimeSeries(200, 50)
};

function generateMockTimeSeries(baseValue, variance) {
    return Array.from({length: 7}, (_, i) => ({
        date: `2026-02-${17 + i}`,
        'PM2.5': baseValue + Math.random() * variance,
        'PM10': baseValue * 1.5,
        'NO2': 40
    }));
}
