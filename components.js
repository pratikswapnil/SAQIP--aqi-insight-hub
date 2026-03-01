// components.js
import { MOCK_STATIONS, getStatusColor } from './data_service.js';

export const renderNavbar = (activeView) => `
    <nav class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" onclick="window.app.setView('home')">
            <span class="font-bold text-xl tracking-tight">AQI <span class="text-emerald-600">Hub</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
            <span class="nav-link ${activeView === 'explorer' ? 'active' : ''}" onclick="window.app.setView('explorer')">Data Explorer</span>
            <span class="nav-link ${activeView === 'map' ? 'active' : ''}" onclick="window.app.setView('map')">Spatial Map</span>
            <span class="nav-link ${activeView === 'methodology' ? 'active' : ''}" onclick="window.app.setView('methodology')">Methodology</span>
        </div>
    </nav>
`;

export const renderMethodologyView = () => `
    <div class="max-w-4xl mx-auto py-12 px-6 bg-white rounded-3xl border border-slate-200 mt-10">
        <h1 class="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-emerald-600 pb-2">Methodology</h1>
        <div class="text-slate-600 space-y-6">
            <p><strong>Strategic Air Quality Informatics Platform (SAQIP):</strong> This prototype translates raw sensor data from OpenAQ into policy-ready insights.</p>
            <h3 class="text-xl font-bold text-emerald-600">Research Background</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Firozabad Project (CSIR-NEERI):</strong> Utilizing AERMOD for industrial source apportionment.</li>
                <li><strong>Stubble Burning:</strong> Researching waste utilization in the pulp and paper industry.</li>
            </ul>
        </div>
    </div>
`;

// Include your basic Hero, AudienceNav, etc. functions here
export const renderHero = () => `<section class="py-20 text-center"><h1 class="text-5xl font-bold mb-4">Air Quality Insight Hub</h1></section>`;
export const renderAudienceNav = () => `<div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6"><div class="p-6 border rounded-xl" onclick="window.app.setView('explorer')">Explorer</div><div class="p-6 border rounded-xl" onclick="window.app.setView('map')">Map</div><div class="p-6 border rounded-xl" onclick="window.app.setView('methodology')">Methodology</div></div>`;
export const renderExplorerView = (city) => `<div class="p-10"><h2>${city} Trends</h2><div id="aqiChart"></div></div>`;
export const renderMapView = () => `<div id="map-canvas" style="height: 600px;"></div>`;
