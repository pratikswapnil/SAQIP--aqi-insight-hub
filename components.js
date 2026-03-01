import { MOCK_STATIONS, getStatusColor } from './data_service.js';

const POLLUTANT_INFO = {
    'PM2.5': 'Fine particles that penetrate deep into the respiratory system.',
    'PM10': 'Coarse dust particles often from construction and road traffic.',
    'NO2': 'A gaseous pollutant primarily from vehicle emissions and power plants.',
    'CO': 'Carbon monoxide, a colorless gas resulting from incomplete combustion.',
    'SO2': 'Sulfur dioxide, often originating from coal combustion in industrial areas.'
};

export const renderNavbar = (activeView) => {
    return `
    <nav class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" onclick="window.app.setView('home')">
            <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <i data-lucide="wind" class="text-white w-5 h-5"></i>
            </div>
            <span class="font-bold text-xl tracking-tight">AQI <span class="text-emerald-600">Hub</span></span>
        </div>
        
        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
            <span class="nav-link ${activeView === 'explorer' ? 'active' : ''}" onclick="window.app.setView('explorer')">Data Explorer</span>
            <span class="nav-link ${activeView === 'map' ? 'active' : ''}" onclick="window.app.setView('map')">Spatial Map</span>
            <a href="#professional-services" class="nav-link">Services</a>
        </div>

        <div class="flex items-center gap-4">
            <div class="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-100">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Nodes Live
            </div>
            <button onclick="window.app.toggleMenu()" class="md:hidden text-slate-900 focus:outline-none">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </div>
    </nav>
    
    <!-- Mobile Menu Container -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4 shadow-xl">
        <span class="block text-lg font-semibold text-slate-900 border-b border-slate-50 pb-2" onclick="window.app.setView('explorer')">Data Explorer</span>
        <span class="block text-lg font-semibold text-slate-900 border-b border-slate-50 pb-2" onclick="window.app.setView('map')">Spatial Map</span>
        <a href="#professional-services" class="block text-lg font-semibold text-slate-900 pb-2" onclick="window.app.toggleMenu()">Professional Services</a>
    </div>`;
};

export const renderHero = () => `
    <section class="relative bg-white pt-12 md:pt-20 pb-12 md:pb-16 overflow-hidden border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div class="z-10 text-center md:text-left">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight text-slate-900 mb-6">
                    Democratizing Air Quality Data for <span class="text-emerald-600">Scientific Research</span> and Policy Action.
                </h1>
                <p class="text-base md:text-lg text-slate-600 mb-10 max-w-xl mx-auto md:mx-0">
                    Access high-resolution, downloadable time-series data and real-time visualization for urban air pollutants in India.
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-4">
                    <button onclick="window.app.setView('explorer')" class="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                        Start Exploration <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                    <button onclick="window.app.setView('map')" class="w-full sm:w-auto bg-slate-100 text-slate-800 px-8 py-4 rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                        <i data-lucide="map" class="w-4 h-4 text-emerald-600"></i> Interactive Map
                    </button>
                </div>
            </div>
            <div class="relative hidden md:block">
                <div class="absolute -top-20 -right-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
                <div class="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 transform rotate-2">
                    <div class="bg-slate-50 rounded-xl p-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time India Feed</span>
                        </div>
                        <div class="space-y-4">
                            ${MOCK_STATIONS.slice(0, 3).map(s => `
                                <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                                    <div class="font-medium text-sm text-slate-700">${s.city}</div>
                                    <div class="flex items-center gap-3">
                                        <span class="text-xs font-bold" style="color: ${getStatusColor(s.aqi)}">${s.aqi} AQI</span>
                                        <div class="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div class="h-full" style="width: ${Math.min(s.aqi/4, 100)}%; background-color: ${getStatusColor(s.aqi)}"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

export const renderAudienceNav = () => `
    <section class="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Tailored for Impact</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="microscope"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Researchers</h3>
                <p class="text-slate-600 mb-6">High-resolution datasets and longitudinal time-series available for immediate export.</p>
                <button onclick="window.app.setView('explorer')" class="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">Launch Explorer <i data-lucide="chevron-right" class="w-4 h-4"></i></button>
            </div>
            <div class="bg-white p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="landmark"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Policymakers</h3>
                <p class="text-slate-600 mb-6">Visual summaries and trend data designed for rapid evidence-based assessments.</p>
                <a href="#reports-insights" class="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">Impact Reports <i data-lucide="chevron-right" class="w-4 h-4"></i></a>
            </div>
            <div class="bg-white p-8 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="megaphone"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">NGOs</h3>
                <p class="text-slate-600 mb-6">Spatial dashboards and interactive markers for community-focused advocacy.</p>
                <button onclick="window.app.setView('map')" class="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">Spatial Map <i data-lucide="chevron-right" class="w-4 h-4"></i></button>
            </div>
        </div>
    </section>
`;

export const renderInsightsSection = () => `
    <section id="reports-insights" class="py-24 bg-white border-y border-slate-100 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div class="max-w-2xl">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Reports & Deep-Dive Insights</h2>
                    <p class="text-slate-600">Curated analytical reports exploring the intersection of urban mobility and public health.</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${[
                    { title: 'Delhi PM2.5 Traffic Regulation Impact', date: 'Feb 12, 2026', cat: 'Policy Analysis', img: 'https://images.unsplash.com/photo-1545147986-a9d6f2bb03b5?auto=format&fit=crop&q=80&w=800' },
                    { title: 'Mumbai Coastal Air Quality Analysis', date: 'Jan 28, 2026', cat: 'Scientific Report', img: 'https://images.unsplash.com/photo-1570160897040-30430ed22112?auto=format&fit=crop&q=80&w=800' },
                    { title: 'Indo-Gangetic Industrial Emissions', date: 'Jan 15, 2026', cat: 'Scientific Report', img: 'https://images.unsplash.com/photo-1565039320828-e97535b882e0?auto=format&fit=crop&q=80&w=800' }
                ].map(post => `
                    <div class="group cursor-pointer">
                        <div class="aspect-video rounded-xl overflow-hidden mb-4 border border-slate-100">
                            <img src="${post.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${post.title}">
                        </div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">${post.cat}</span>
                            <span class="text-[10px] text-slate-400 font-medium">${post.date}</span>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-3">${post.title}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
`;

export const renderServicesPanel = () => `
    <section id="professional-services" class="py-24 bg-slate-50 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h3 class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Partner with Us</h3>
                <h2 class="text-4xl font-bold text-slate-900 mb-6">Expert Environmental Consultancy</h2>
                <p class="text-slate-600 text-lg leading-relaxed">
                    Translating high-resolution data into actionable environmental strategies.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-all">
                    <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8">
                        <i data-lucide="clipboard-check" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Compliance Audit</h3>
                    <p class="text-slate-500 mb-8 text-sm">Regulatory impact assessments and mitigation strategy development.</p>
                    <button class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors">Inquire Now</button>
                </div>
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-all">
                    <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8">
                        <i data-lucide="cpu" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Custom Modeling</h3>
                    <p class="text-slate-500 mb-8 text-sm">Advanced dispersion modeling (AERMOD) and source apportionment.</p>
                    <button class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors">Inquire Now</button>
                </div>
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-all">
                    <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8">
                        <i data-lucide="layout-dashboard" class="w-7 h-7"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4">Data Dashboard</h3>
                    <p class="text-slate-500 mb-8 text-sm">White-labeled monitoring solutions for smart city integrations.</p>
                    <button class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors">Inquire Now</button>
                </div>
            </div>
        </div>
    </section>
`;

export const renderExplorerView = (city, pollutant) => `
    <div class="flex flex-col lg:flex-row gap-8">
        <aside class="w-full lg:w-72 flex-shrink-0">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:sticky lg:top-24">
                <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <i data-lucide="sliders-horizontal" class="w-4 h-4 text-emerald-600"></i>
                    Control Panel
                </h4>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                        <select onchange="window.app.updateExplorer({city: this.value})" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer">
                            <option value="Delhi" ${city === 'Delhi' ? 'selected' : ''}>New Delhi</option>
                            <option value="Mumbai" ${city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                            <option value="Bengaluru" ${city === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
                            <option value="Chennai" ${city === 'Chennai' ? 'selected' : ''}>Chennai</option>
                            <option value="Kolkata" ${city === 'Kolkata' ? 'selected' : ''}>Kolkata</option>
                        </select>
                    </div>
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pollutant</label>
                            <div class="group relative">
                                <i data-lucide="info" class="w-3.5 h-3.5 text-slate-400 cursor-help"></i>
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded hidden group-hover:block z-[2000] shadow-xl">
                                    ${POLLUTANT_INFO[pollutant] || 'Air pollutant metric.'}
                                </div>
                            </div>
                        </div>
                        <select onchange="window.app.updateExplorer({pollutant: this.value})" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer">
                            <option value="PM2.5" ${pollutant === 'PM2.5' ? 'selected' : ''}>PM2.5 (Fine)</option>
                            <option value="PM10" ${pollutant === 'PM10' ? 'selected' : ''}>PM10 (Coarse)</option>
                            <option value="NO2" ${pollutant === 'NO2' ? 'selected' : ''}>NO2 (Nitrogen)</option>
                            <option value="CO" ${pollutant === 'CO' ? 'selected' : ''}>CO (Carbon)</option>
                            <option value="SO2" ${pollutant === 'SO2' ? 'selected' : ''}>SO2 (Sulfur)</option>
                        </select>
                    </div>
                </div>
                
                <div class="mt-8 pt-6 border-t border-slate-100 space-y-3">
                    <button onclick="window.app.exportData('csv')" class="w-full bg-slate-900 text-white p-3 rounded-lg font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                        <i data-lucide="file-spreadsheet" class="w-4 h-4"></i> Export CSV
                    </button>
                    <button onclick="window.app.exportData('json')" class="w-full bg-white text-slate-900 border border-slate-200 p-3 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <i data-lucide="file-json" class="w-4 h-4"></i> Export JSON
                    </button>
                </div>
            </div>
        </aside>

        <div class="flex-grow">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-8">
                <div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900">${city} - ${pollutant} Trends</h2>
                        <p class="text-slate-500 text-sm">7-day historical observation window</p>
                    </div>
                </div>
                
                <div class="min-h-[300px] md:min-h-[400px] w-full" id="aqiChart"></div>
                
                <div class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                    <div class="p-4 bg-slate-50 rounded-lg">
                        <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Weekly Mean</p>
                        <p class="text-lg md:text-xl font-bold text-slate-800">142.5 <span class="text-xs font-normal">µg/m³</span></p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-lg">
                        <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                        <p class="text-lg md:text-xl font-bold text-red-500">Unhealthy</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export const renderMapView = () => `
    <div class="h-full flex flex-col">
        <div class="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h2 class="text-xl font-bold flex items-center gap-2">
                    <i data-lucide="map" class="text-emerald-600"></i> Station Network
                </h2>
            </div>
            <div class="flex gap-2 flex-wrap justify-center">
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    <span class="text-[9px] font-bold">Good</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <span class="w-2 h-2 rounded-full bg-[#FBBF24]"></span>
                    <span class="text-[9px] font-bold">Mod</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <span class="w-2 h-2 rounded-full bg-[#F97316]"></span>
                    <span class="text-[9px] font-bold">Poor</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <span class="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span class="text-[9px] font-bold">Danger</span>
                </div>
            </div>
        </div>
        <div id="map-canvas" class="flex-grow bg-slate-100"></div>
    </div>
`;
