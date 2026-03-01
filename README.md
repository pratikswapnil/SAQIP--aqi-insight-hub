# SAQIP--aqi-insight-hub
Strategic Air Quality Informatics Platform (SAQIP)
Democratizing Air Quality Data for Research & Policy Action
Live Demo: [Link to your Vercel/GitHub Pages URL here]

Overview
The Strategic Air Quality Informatics Platform (SAQIP) is a professional-grade Single Page Application (SPA) designed to bridge the gap between complex environmental datasets and actionable policy insights. Developed as a self-initiated project by an Environmental Consultant with experience at CSIR-NEERI, this platform serves as a prototype for high-resolution urban air quality monitoring and analysis in India.

Primary Objectives
For Researchers: Provide a reliable source of high-resolution, time-series data (PM₂.₅, PM₁₀, NO₂, CO, SO₂) exportable for environmental modeling and epidemiological studies.

For Policymakers: Offer an intuitive dashboard with real-time pollution maps and comparative analytics to inform regulatory interventions (e.g., GRAP actions in Delhi-NCR).

For Environmental NGOs: Equip advocacy groups with spatial hotspots and automated health advisories to drive community-level awareness.

Key Features
Real-Time Monitoring: Live data integration via OpenAQ and WAQI APIs, covering major Indian metropolitan hubs.

Data Explorer (MVP): Interactive time-series charts using Plotly.js, allowing users to visualize pollutant trends over a 7-day window.

Spatial Hotspot Map: Geographical station network visualization using Leaflet.js with color-coded AQI markers.

Research-Ready Export: One-click functionality to download filtered datasets in CSV or JSON formats.

Health Advisory System: Automated, science-backed guidance based on real-time AQI thresholds.

Technology Stack
Frontend: React.js / Vite (Modern, component-based architecture)

Styling: Tailwind CSS (Responsive, minimalist UI/UX)

Visualizations: Plotly.js (Charts) and Leaflet.js (GIS Mapping)

Data Pipeline: REST API integration (OpenAQ / WAQI)

Deployment: Vercel (Production-grade hosting)

Methodology & Data Attribution
This project prioritizes scientific integrity. Data is sourced from the OpenAQ Platform and WAQI API, which aggregate readings from official government monitoring stations (CPCB/SPCB).

Project Lead: Swapnil (Independent Environmental Consultant)

Experience Context: This platform is informed by professional project work involving emission inventories and source apportionment (e.g., NEERI Firozabad & SAQIP concept notes).

Project Structure
/aqi-insight-hub
|-- /src
|   |-- components.js   # UI components (Navbar, Hero, Charts)
|   |-- app.js          # Core application logic and routing
|   |-- apiService.js   # Asynchronous data fetching from OpenAQ
|   |-- data_service.js # Data processing and color utility functions
|-- /docs               # Project Charter and Methodology notes
|-- index.html          # Main entry point
|-- styles.css          # Custom Tailwind configurations



Professional Services
Beyond this technical tool, I provide expert environmental consultancy services, including:

Environmental Impact Assessments (EIA)

Air Dispersion Modeling (AERMOD)

Compliance Audits & Sustainability Strategy

Custom Data Dashboard Development
