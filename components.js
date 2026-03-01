// components.js
import { getStatusColor } from './data_service.js';

export const renderMethodologyView = () => `
    <div class="max-w-4xl mx-auto py-12 px-6 bg-white rounded-3xl shadow-sm border border-slate-200 mt-10">
        <h1 class="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-emerald-600 pb-2">Scientific Methodology</h1>
        <div class="prose prose-slate max-w-none">
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Framework: Strategic Air Quality Informatics Platform (SAQIP)</h3>
            <p class="text-slate-600 mb-6">
                SAQIP integrates high-resolution monitoring data with policy-level insights. This implementation focuses on translating raw PM2.5 concentrations into actionable health categories.
            </p>
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Case Study: Industrial Emission Source Mapping</h3>
            <p class="text-slate-600 mb-4">
                The analytical logic used here is informed by professional research conducted at <strong>CSIR-NEERI</strong>, specifically:
            </p>
            <ul class="list-disc pl-6 text-slate-600 space-y-3 mb-8">
                <li><strong>Firozabad Source Apportionment:</strong> Using AERMOD modeling to distinguish industrial glass-works emissions from vehicular contributions.</li>
                <li><strong>Waste-to-Value Research:</strong> Assessing the viability of utilizing stubble burning waste as a raw material in the pulp and paper industry to reduce seasonal ambient air degradation.</li>
            </ul>
            <h3 class="text-xl font-bold text-emerald-600 mb-4">Data Quality Assurance</h3>
            <p class="text-slate-600">
                We utilize the OpenAQ API to pull real-time data from CPCB and SPCB stations. A 24-hour rolling average is applied to the time-series visualizations to ensure data stability for research purposes.
            </p>
        </div>
    </div>
`;

// ... keep your other export const functions (renderNavbar, renderHero, etc.)
// Update renderNavbar Methodology link to: 
// <a href="javascript:void(0)" onclick="window.app.setView('methodology')" class="hover:text-emerald-600">Methodology</a>
