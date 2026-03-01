// app.js
import * as components from './components.js';
import { fetchLiveIndianStations, HISTORICAL_DATA_MOCK, getStatusColor } from './data_service.js';

class AQIApp {
    constructor() {
        this.currentView = 'home';
        this.selectedCity = 'Delhi';
        this.selectedPollutant = 'PM2.5';
        this.stations = []; // Store live data here
        this.isMenuOpen = false;
        
        this.init();
    }

    async init() {
        window.app = this;
        // Fetch live data on startup
        this.stations = await fetchLiveIndianStations();
        this.render();
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

    // ... (keep updateExplorer, initChart functions)

    initMap() {
        const mapContainer = document.getElementById('map-canvas');
        if (!mapContainer) return;
        if (this.map) this.map.remove();

        this.map = L.map('map-canvas', { zoomControl: false }).setView([22.9734, 78.6569], 5);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(this.map);

        // Use live stations instead of mock
        this.stations.forEach(station => {
            const color = getStatusColor(station.aqi);
            const markerHtml = `<div class="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white" style="background-color: ${color}">${station.aqi}</div>`;
            const icon = L.divIcon({ html: markerHtml, className: 'custom-div-icon', iconSize: [24, 24] });

            L.marker([station.lat, station.lng], { icon })
                .addTo(this.map)
                .bindPopup(`<h4 class="font-bold">${station.city}</h4><p>PM2.5: ${station.pm25} µg/m³</p>`, { className: 'aqi-custom-popup' });
        });
    }

    render() {
        const navbar = document.getElementById('navbar-container');
        const viewHome = document.getElementById('view-home');
        const viewExplorer = document.getElementById('view-explorer');
        const viewMap = document.getElementById('view-map');

        navbar.innerHTML = components.renderNavbar(this.currentView);

        // Hide all views first
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
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden aspect-video border border-slate-200 relative group cursor-pointer" onclick="window.app.setView('map')">
                            <div class="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10 flex items-center justify-center">
                                <div class="text-center p-8 bg-white/90 backdrop-blur rounded-xl shadow-lg transform group-hover:scale-105 transition-transform">
                                    <i data-lucide="map" class="w-12 h-12 text-emerald-600 mx-auto mb-4"></i>
                                    <p class="font-bold text-slate-800 text-lg">Launch Spatial Dashboard</p>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover">
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
        } else if (this.currentView === 'methodology') {
            viewHome.classList.remove('hidden'); // Reuse the home container for the methodology text
            viewHome.innerHTML = components.renderMethodologyView();
        }

        lucide.createIcons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AQIApp();
});
