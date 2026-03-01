import * as components from './components.js';
import { MOCK_STATIONS, HISTORICAL_DATA_MOCK, getStatusColor } from './data_service.js';

class AQIApp {
    constructor() {
        this.currentView = 'home';
        this.selectedCity = 'Delhi';
        this.selectedPollutant = 'PM2.5';
        this.dateRange = 'Last 7 Days';
        this.map = null;
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        window.app = this;
        this.render();
        this.initRouter();
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden', !this.isMenuOpen);
        }
    }

    setView(view) {
        this.currentView = view;
        this.isMenuOpen = false;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (view === 'explorer') {
            this.initChart();
        } else if (view === 'map') {
            this.initMap();
        }
    }

    updateExplorer(updates) {
        if (updates.city) this.selectedCity = updates.city;
        if (updates.pollutant) this.selectedPollutant = updates.pollutant;
        
        this.render();
        this.initChart();
    }

    initRouter() {
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.setView(e.state.view);
            }
        });
    }

    initChart() {
        const chartDiv = document.getElementById('aqiChart');
        if (!chartDiv) return;

        const cityData = HISTORICAL_DATA_MOCK[this.selectedCity];
        const pollutantKey = this.selectedPollutant;
        
        const xData = cityData.map(d => d.date);
        const yData = cityData.map(d => d[pollutantKey] || d.value);
        
        const trace = {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'lines+markers',
            name: pollutantKey,
            line: {
                color: '#10B981',
                width: 3,
                shape: 'spline'
            },
            marker: {
                size: 8,
                color: '#065f46'
            },
            fill: 'tozeroy',
            fillcolor: 'rgba(16, 185, 129, 0.1)'
        };

        const layout = {
            autosize: true,
            height: 400,
            margin: { l: 40, r: 20, t: 10, b: 40 },
            showlegend: false,
            xaxis: {
                gridcolor: '#f1f5f9',
                zeroline: false
            },
            yaxis: {
                gridcolor: '#f1f5f9',
                zeroline: false,
                title: {
                    text: 'Concentration (µg/m³)',
                    font: { size: 10, color: '#64748b', family: 'Inter' }
                }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            hovermode: 'x unified'
        };

        const config = {
            responsive: true,
            displayModeBar: false
        };

        Plotly.newPlot('aqiChart', [trace], layout, config);
    }

    initMap() {
        const mapContainer = document.getElementById('map-canvas');
        if (!mapContainer) return;

        if (this.map) {
            this.map.remove();
        }

        this.map = L.map('map-canvas', {
            zoomControl: false
        }).setView([22.9734, 78.6569], 5);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);

        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        MOCK_STATIONS.forEach(station => {
            const color = getStatusColor(station.aqi);
            
            const markerHtml = `
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-8 h-8 rounded-full opacity-20 animate-ping" style="background-color: ${color}"></div>
                    <div class="relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white" style="background-color: ${color}">
                        ${station.aqi}
                    </div>
                </div>
            `;

            const icon = L.divIcon({
                html: markerHtml,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const popupContent = `
                <div class="p-1 min-w-[180px]">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-slate-900">${station.city}</h4>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase" style="background-color: ${color}">
                            ${station.status}
                        </span>
                    </div>
                    <div class="space-y-1.5">
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">AQI Index:</span>
                            <span class="font-semibold text-slate-800">${station.aqi}</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-500">PM2.5 (µg/m³):</span>
                            <span class="font-semibold text-slate-800">${station.pm25}</span>
                        </div>
                    </div>
                    <button onclick="window.app.updateExplorer({city: '${station.city}'}); window.app.setView('explorer')" class="w-full mt-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded hover:bg-emerald-600 transition-colors">
                        View Historical Trends
                    </button>
                </div>
            `;

            L.marker([station.lat, station.lng], { icon })
                .addTo(this.map)
                .bindPopup(popupContent, {
                    className: 'aqi-custom-popup',
                    closeButton: false
                });
        });
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast-message flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border ${type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`;
        toast.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
            <span class="font-medium text-sm">${message}</span>
        `;
        container.appendChild(toast);
        lucide.createIcons();
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    exportData(format) {
        try {
            const data = HISTORICAL_DATA_MOCK[this.selectedCity];
            let content = '';
            let mimeType = '';
            let fileName = `aqi_hub_export_${this.selectedCity.toLowerCase()}_${new Date().getTime()}`;

            if (format === 'json') {
                content = JSON.stringify(data, null, 2);
                mimeType = 'application/json';
                fileName += '.json';
            } else {
                const headers = Object.keys(data[0]).join(',');
                const rows = data.map(obj => Object.values(obj).join(','));
                content = [headers, ...rows].join('\n');
                mimeType = 'text/csv';
                fileName += '.csv';
            }

            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.click();
            URL.revokeObjectURL(url);
            
            this.showToast(`Successfully exported ${format.toUpperCase()} dataset for ${this.selectedCity}`);
        } catch (error) {
            this.showToast('Export failed. Please try again.', 'error');
        }
    }

    render() {
        const navbar = document.getElementById('navbar-container');
        const viewHome = document.getElementById('view-home');
        const viewExplorer = document.getElementById('view-explorer');
        const viewMap = document.getElementById('view-map');

        navbar.innerHTML = components.renderNavbar(this.currentView);

        [viewHome, viewExplorer, viewMap].forEach(v => v.classList.add('hidden'));

        if (this.currentView === 'home') {
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = `
                ${components.renderHero()}
                ${components.renderAudienceNav()}
                <div class="bg-slate-50 py-20 px-6">
                    <div class="max-w-7xl mx-auto text-center">
                        <h3 class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Phase 2 Enabled</h3>
                        <h2 class="text-3xl font-bold mb-6">Interactive Spatial Analysis</h2>
                        <p class="text-slate-500 max-w-2xl mx-auto mb-10">High-fidelity GIS layers and monitoring station data for precise regional intervention. Now live for major metropolitan areas.</p>
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden aspect-video border border-slate-200 relative group cursor-pointer" onclick="window.app.setView('map')">
                            <div class="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10 flex items-center justify-center">
                                <div class="text-center p-8 bg-white/90 backdrop-blur rounded-xl shadow-lg transform group-hover:scale-105 transition-transform">
                                    <i data-lucide="map" class="w-12 h-12 text-emerald-600 mx-auto mb-4"></i>
                                    <p class="font-bold text-slate-800 text-lg">Launch Spatial Dashboard</p>
                                    <p class="text-sm text-slate-500">Live Station Network v1.0</p>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover" alt="Map Preview">
                        </div>
                    </div>
                </div>
                ${components.renderInsightsSection()}
                ${components.renderServicesPanel()}
            `;
        } else if (this.currentView === 'explorer') {
            viewExplorer.classList.remove('hidden');
            viewExplorer.innerHTML = components.renderExplorerView(this.selectedCity, this.selectedPollutant);
        } else if (this.currentView === 'map') {
            viewMap.classList.remove('hidden');
            viewMap.innerHTML = components.renderMapView();
        }

        lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AQIApp();
});
