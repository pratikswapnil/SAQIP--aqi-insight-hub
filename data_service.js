export const MOCK_STATIONS = [
    {
        id: 'delhi-01',
        city: 'Delhi',
        aqi: 310,
        status: 'Very Poor',
        pm25: 196.9,
        pm10: 380.2,
        lat: 28.6139,
        lng: 77.2090
    },
    {
        id: 'mumbai-01',
        city: 'Mumbai',
        aqi: 184,
        status: 'Moderate',
        pm25: 142.48,
        pm10: 177.5,
        lat: 19.0760,
        lng: 72.8777
    },
    {
        id: 'bengaluru-01',
        city: 'Bengaluru',
        aqi: 84,
        status: 'Satisfactory',
        pm25: 44.0,
        pm10: 80.0,
        lat: 12.9716,
        lng: 77.5946
    },
    {
        id: 'chennai-01',
        city: 'Chennai',
        aqi: 112,
        status: 'Moderate',
        pm25: 68.5,
        pm10: 110.2,
        lat: 13.0827,
        lng: 80.2707
    },
    {
        id: 'kolkata-01',
        city: 'Kolkata',
        aqi: 220,
        status: 'Poor',
        pm25: 155.2,
        pm10: 240.5,
        lat: 22.5726,
        lng: 88.3639
    }
];

const generateMockTimeSeries = (baseValue, variance) => {
    return [
        { date: '2026-02-17', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.5, 'NO2': 40, 'CO': 1.2, 'SO2': 8 },
        { date: '2026-02-18', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.4, 'NO2': 38, 'CO': 1.1, 'SO2': 7 },
        { date: '2026-02-19', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.6, 'NO2': 45, 'CO': 1.4, 'SO2': 10 },
        { date: '2026-02-20', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.8, 'NO2': 50, 'CO': 1.6, 'SO2': 12 },
        { date: '2026-02-21', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.5, 'NO2': 42, 'CO': 1.3, 'SO2': 9 },
        { date: '2026-02-22', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.3, 'NO2': 35, 'CO': 1.0, 'SO2': 6 },
        { date: '2026-02-23', 'PM2.5': baseValue + Math.random() * variance, 'PM10': baseValue * 1.4, 'NO2': 39, 'CO': 1.1, 'SO2': 7 }
    ];
};

export const HISTORICAL_DATA_MOCK = {
    'Delhi': generateMockTimeSeries(250, 60),
    'Mumbai': generateMockTimeSeries(150, 40),
    'Bengaluru': generateMockTimeSeries(80, 20),
    'Chennai': generateMockTimeSeries(90, 25),
    'Kolkata': generateMockTimeSeries(200, 50)
};

export function getStatusColor(aqi) {
    if (aqi <= 50) return '#10B981';    // Green
    if (aqi <= 100) return '#FBBF24';   // Yellow
    if (aqi <= 200) return '#F97316';   // Orange
    if (aqi <= 300) return '#EF4444';   // Red
    if (aqi <= 400) return '#7E22CE';   // Purple
    return '#7F1D1D';                   // Maroon
}
