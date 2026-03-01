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
        if (view === 'map') this.initMap();
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
    }

    initMap() { /* Leaflet logic here using this.stations */ }
}

document.addEventListener('DOMContentLoaded', () => { new AQIApp(); });
