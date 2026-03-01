// components.js
import { getStatusColor } from './data_service.js';

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

// ... Add all your other render functions (renderHero, renderExplorerView, etc.) from your previous version here.
