// app.js
import * as components from './components.js';
import { fetchLiveIndianStations, getStatusColor } from './data_service.js';

class AQIApp {
    constructor() {
        this.currentView = 'home';
        this.selectedCity = 'Delhi';
        this.selectedPollutant = 'PM2.5';
        this.stations = [];
        this.init();
    }

    async init() {
        window.app = this;
        try {
            this.stations = await fetchLiveIndianStations();
        } catch (e) {
            console.error("Initial fetch failed", e);
        }
        this.render();
    }

    setView(view) {
        this.currentView = view;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (view === 'explorer') this.initChart();
        if (view === 'map') this.initMap();
    }

    render() {
        const navbar = document.getElementById('navbar-container');
        const viewHome = document.getElementById('view-home');
        const viewExplorer = document.getElementById('view-explorer');
        const viewMap = document.getElementById('view-map');

        // Safety check to ensure containers exist
        if (!navbar || !viewHome || !viewExplorer || !viewMap) return;

        navbar.innerHTML = components.renderNavbar(this.currentView);
        [viewHome, viewExplorer, viewMap].forEach(v => v.classList.add('hidden'));

        if (this.currentView === 'home') {
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = `
                ${components.renderHero()}
                ${components.renderAudienceNav()}
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
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = components.renderMethodologyView();
        }

        if (window.lucide) lucide.createIcons();
    }

    // Standard chart and map initializers (initChart, initMap, etc.) go here...
    initChart() { /* Plotly logic */ }
    initMap() { /* Leaflet logic */ }
}

document.addEventListener('DOMContentLoaded', () => { new AQIApp(); });
