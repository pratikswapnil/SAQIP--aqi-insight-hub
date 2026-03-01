// components.js
import { getStatusColor } from './data_service.js';

const POLLUTANT_INFO = {
    'PM2.5': 'Fine particles that penetrate deep into the respiratory system.',
    'PM10': 'Coarse dust particles often from construction and road traffic.',
    'NO2': 'A gaseous pollutant primarily from vehicle emissions and power plants.',
    'CO': 'Carbon monoxide, a colorless gas resulting from incomplete combustion.',
    'SO2': 'Sulfur dioxide, often originating from coal combustion in industrial areas.'
};

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
            <a href="#professional-services" class="nav-link">Services</a>
        </div>
    </nav>
`;

export const renderMethodologyView = () => `
    <div class="max-w-4xl mx-auto py-12 px-6 bg-white rounded-3xl shadow-sm border border-slate-200 mt-10">
        <h1 class="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-emerald-600 pb-2">Scientific Methodology</h1>
        <div class="prose prose-slate max-w-none">
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Strategic Air Quality Informatics Platform (SAQIP)</h3>
            <p class="text-slate-600 mb-6">
                SAQIP integrates high-resolution monitoring data with policy-level insights. This implementation focuses on translating raw PM2.5 concentrations into actionable health categories.
            </p>
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Expert Case Studies</h3>
            <ul class="list-disc pl-6 text-slate-600 space-y-3 mb-8">
                <li><strong>Firozabad Source Apportionment:</strong> Distinguishing industrial glass-works emissions from vehicular contributions using AERMOD.</li>
                <li><strong>Stubble Burning Waste Management:</strong> Research on utilizing agricultural waste as raw material for the pulp and paper industry.</li>
            </ul>
        </div>
    </div>
`;

// Include your other render functions (Hero, AudienceNav, InsightsSection, ServicesPanel, ExplorerView, MapView) here. 
// Ensure they match the versions you had before.
