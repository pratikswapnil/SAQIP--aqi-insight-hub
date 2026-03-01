// components.js
import { getStatusColor, HISTORICAL_DATA_MOCK } from './data_service.js';

export const renderNavbar = (activeView) => `
    <nav class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" onclick="window.app.setView('home')">
            <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <i data-lucide="wind" class="text-white w-5 h-5"></i>
            </div>
            <span class="font-bold text-xl tracking-tight">AQI <span class="text-emerald-600">Hub</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
            <span class="nav-link ${activeView === 'explorer' ? 'active' : ''}" onclick="window.app.setView('explorer')">Data Explorer</span>
            <span class="nav-link ${activeView === 'map' ? 'active' : ''}" onclick="window.app.setView('map')">Spatial Map</span>
            <a href="javascript:void(0)" onclick="window.app.setView('methodology')" class="nav-link ${activeView === 'methodology' ? 'active' : ''}">Methodology</a>
        </div>
    </nav>
`;

export const renderMethodologyView = () => `
    <div class="max-w-4xl mx-auto py-12 px-6 bg-white rounded-3xl shadow-sm border border-slate-200 mt-10">
        <h1 class="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-emerald-600 pb-2">Technical Methodology</h1>
        <div class="prose prose-slate max-w-none">
            <h3 class="text-xl font-bold text-emerald-600 mb-4">The SAQIP Framework</h3>
            <p class="text-slate-600 mb-6">The Strategic Air Quality Informatics Platform (SAQIP) bridges the gap between raw sensors and policy implementation.</p>
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Research Experience</h3>
            <p class="text-slate-600 mb-4">The analytical logic here is informed by research at <strong>CSIR-NEERI</strong>:</p>
            <ul class="list-disc pl-6 text-slate-600 space-y-3">
                <li><strong>Firozabad Source Apportionment:</strong> Using AERMOD to analyze industrial vs. vehicular impact.</li>
                <li><strong>Circular Economy:</strong> Research on converting stubble burning waste into raw material for the pulp industry.</li>
            </ul>
        </div>
    </div>
`;

export const renderHero = () => `<section class="bg-white py-12 border-b border-slate-100 text-center px-6">
    <h1 class="text-4xl font-bold text-slate-900 mb-4">Democratizing Air Quality Data.</h1>
    <p class="text-slate-600 max-w-2xl mx-auto">Access real-time visualization for urban air pollutants in India.</p>
</section>`;

export const renderAudienceNav = () => `<div class="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
    <div class="p-6 bg-white rounded-xl border border-slate-100 shadow-sm" onclick="window.app.setView('explorer')">
        <h3 class="font-bold text-emerald-600">For Researchers</h3>
        <p class="text-sm text-slate-500">Access time-series data.</p>
    </div>
    <div class="p-6 bg-white rounded-xl border border-slate-100 shadow-sm" onclick="window.app.setView('methodology')">
        <h3 class="font-bold text-emerald-600">For Policymakers</h3>
        <p class="text-sm text-slate-500">Evidence-based insights.</p>
    </div>
    <div class="p-6 bg-white rounded-xl border border-slate-100 shadow-sm" onclick="window.app.setView('map')">
        <h3 class="font-bold text-emerald-600">For NGOs</h3>
        <p class="text-sm text-slate-500">Spatial hotspot mapping.</p>
    </div>
</div>`;

export const renderInsightsSection = () => ``; 
export const renderServicesPanel = () => ``;
export const renderExplorerView = (city, pollutant) => `<div class="p-8 bg-white rounded-xl border border-slate-200">
    <h2 class="text-2xl font-bold mb-4">${city} - ${pollutant} Trends</h2>
    <div id="aqiChart" class="w-full h-[400px]"></div>
</div>`;
export const renderMapView = () => `<div id="map-canvas" class="w-full h-[calc(100vh-64px)] bg-slate-100"></div>`;
