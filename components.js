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
        <h1 class="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-emerald-600 pb-2 text-center">Technical Methodology</h1>
        <div class="text-slate-600 space-y-6">
            <p class="text-center font-medium italic">Strategic Air Quality Informatics Platform (SAQIP)</p>
            <h3 class="text-xl font-bold text-emerald-600">Research & Consultancy Context</h3>
            <p>This implementation is informed by professional research conducted at <strong>CSIR-NEERI</strong>:</p>
            <ul class="list-disc pl-6 space-y-3">
                <li><strong>Firozabad Source Apportionment:</strong> Using AERMOD modeling to distinguish industrial vs. vehicular impact.</li>
                <li><strong>Stubble Burning Mitigation:</strong> Research on utilizing agricultural waste as a resource for the pulp and paper industry.</li>
            </ul>
        </div>
    </div>
`;

export const renderHero = () => `<section class="py-20 text-center"><h1 class="text-4xl md:text-6xl font-bold mb-4 text-slate-900">Democratizing Air Quality Data.</h1></section>`;
export const renderAudienceNav = () => `
    <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-12">
        <div class="p-8 bg-white rounded-xl border border-slate-100 shadow-sm cursor-pointer" onclick="window.app.setView('explorer')"><h3 class="font-bold text-emerald-600">For Researchers</h3></div>
        <div class="p-8 bg-white rounded-xl border border-slate-100 shadow-sm cursor-pointer" onclick="window.app.setView('methodology')"><h3 class="font-bold text-emerald-600">For Policymakers</h3></div>
        <div class="p-8 bg-white rounded-xl border border-slate-100 shadow-sm cursor-pointer" onclick="window.app.setView('map')"><h3 class="font-bold text-emerald-600">For NGOs</h3></div>
    </div>
`;
export const renderInsightsSection = () => ``; 
export const renderServicesPanel = () => ``;
export const renderExplorerView = (city) => `<div class="p-10"><h2 class="text-2xl font-bold mb-4">${city} Trends</h2><div id="aqiChart" style="height:400px;"></div></div>`;
export const renderMapView = () => `<div id="map-canvas" style="height: calc(100vh - 64px);"></div>`;
