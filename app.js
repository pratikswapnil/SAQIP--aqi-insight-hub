// app.js
import * as components from './components.js';
import { fetchLiveIndianStations, HISTORICAL_DATA_MOCK, getStatusColor } from './data_service.js';

class AQIApp {
    constructor() {
        this.currentView = 'home';
        this.selectedCity = 'Delhi';
        this.stations = [];
        this.init();
    }

    async init() {
        window.app = this;
        this.stations = await fetchLiveIndianStations();
        this.render();
    }

    setView(view) {
        this.currentView = view;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (view === 'map') this.initMap();
    }

    render() {
        const navbar = document.getElementById('navbar-container');
        const viewHome = document.getElementById('view-home');
        const viewExplorer = document.getElementById('view-explorer');
        const viewMap = document.getElementById('view-map');

        if (navbar) navbar.innerHTML = components.renderNavbar(this.currentView);
        [viewHome, viewExplorer, viewMap].forEach(v => { if(v) v.classList.add('hidden'); });

        if (this.currentView === 'home') {
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = components.renderHero() + components.renderAudienceNav();
        } else if (this.currentView === 'explorer') {
            viewExplorer.classList.remove('hidden');
            viewExplorer.innerHTML = components.renderExplorerView(this.selectedCity);
        } else if (this.currentView === 'map') {
            viewMap.classList.remove('hidden');
            viewMap.innerHTML = components.renderMapView();
        } else if (this.currentView === 'methodology') {
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = components.renderMethodologyView();
        }

        if (window.lucide) lucide.createIcons();
    }

    initMap() {
        if (!document.getElementById('map-canvas')) return;
        if (this.map) this.map.remove();
        this.map = L.map('map-canvas').setView([22.9734, 78.6569], 5);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(this.map);
        
        this.stations.forEach(s => {
            const color = getStatusColor(s.aqi);
            const icon = L.divIcon({
                html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow flex items-center justify-center text-[10px] font-bold text-white" style="background-color: ${color}">${s.aqi}</div>`,
                className: 'custom-icon', iconSize: [24, 24]
            });
            L.marker([s.lat, s.lng], { icon }).addTo(this.map).bindPopup(`<b>${s.city}</b><br>PM2.5: ${s.pm25}`);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { new AQIApp(); });
