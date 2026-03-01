// app.js
import * as components from './components.js';
import { fetchLiveIndianStations, HISTORICAL_DATA_MOCK, getStatusColor } from './data_service.js';

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
        // Fetch live data on startup with CORS proxy
        this.stations = await fetchLiveIndianStations();
        this.render();
    }

    setView(view) {
        this.currentView = view;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (view === 'explorer') {
            this.initChart();
        } else if (view === 'map') {
            this.initMap();
        }
    }

    render() {
        const navbar = document.getElementById('navbar-container');
        const viewHome = document.getElementById('view-home');
        const viewExplorer = document.getElementById('view-explorer');
        const viewMap = document.getElementById('view-map');

        if (navbar) navbar.innerHTML = components.renderNavbar(this.currentView);

        // Hide all views first
        [viewHome, viewExplorer, viewMap].forEach(v => {
            if (v) v.classList.add('hidden');
        });

        if (this.currentView === 'home') {
            viewHome.classList.remove('hidden');
            viewHome.innerHTML = `
                ${components.renderHero()}
                ${components.renderAudienceNav()}
                <div class="bg-slate-50 py-20 px-6">
                    <div class="max-w-7xl mx-auto text-center">
                        <h2 class="text-3xl font-bold mb-6">Interactive Spatial Analysis</h2>
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden aspect-video border border-slate-200 relative group cursor-pointer" onclick="window.app.setView('map')">
                            <div class="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10 flex items-center justify-center">
                                <p class="font-bold text-white text-lg">Launch Spatial Dashboard</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                ${components.renderInsightsSection ? components.renderInsightsSection() : ''}
                ${components.renderServicesPanel ? components.renderServicesPanel() : ''}
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

    // Include your initChart and initMap functions here as per previous versions
}

document.addEventListener('DOMContentLoaded', () => {
    new AQIApp();
});
