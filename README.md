# ApexEvents — V3.0 Enterprise Luxury Event Staging SaaS

An opulent, high-performance **React 19 + TypeScript + Zustand + Tailwind CSS v4** enterprise web platform engineered for luxury event planners, palatial weddings, and corporate staging operations. Inspired by design cues from Apple, Airbnb, and Tesla, the platform combines high-fidelity glassmorphism, fluid interactive canvas simulations, automated logistics, and a client portal.

---

## 🚀 Key Features

### 1. Interactive DMX Staging & Laser Console
*   **HTML5 Canvas Stage Visualizer**: Animates spotlights, light cone sweeps, and haze density overlays in real-time.
*   **DMX Console Controls**: Sliders to adjust master dimmer, strobe rate (0-15Hz), fog/haze volume, and spotlight sweep speed.
*   **Vibrant Laser Simulation**: Choose between *Sine Scan*, *Cone Fan*, or *Mesh Cross* laser patterns with custom RGB hex selectors.
*   **Preset Management**: Save custom stage layouts to local storage and load them with one click.

### 2. AI Decor Architect & Google Maps Radar
*   **AI Staging Recommender**: Dynamic event layout wizard matching stage truss structure, seating styles, and floral requirements based on guest counts and target budgets.
*   **Google Maps Radar**: Simulates live venue routing distance, transport time, and cargo loading logistics.

### 3. Client Portal & Invoicing
*   **Timeline Tracker**: Live progress timeline monitoring design locks, truss setup, and final showcase status.
*   **Tax Invoicing**: Generates 18% GST invoices complete with custom QR codes and client payment processing indicators.
*   **Payment Simulator**: Real-time payment gateway simulation supporting UPI QR codes, Razorpay, and Stripe options.

### 4. Admin Management Console
*   **Operational Dashboard**: Live telemetry metrics for revenue, active bookings, VIP accounts, and staff onsite.
*   **Employee Task Assigner**: Dispatch staging technicians, assign daily tasks, track attendance, and log staff locations.
*   **Customer CRM**: In-depth histories, follow-up logs, and integrated WhatsApp actions.
*   **CMS Management**: Administrative controls to edit customer review listings, blog posts, and media gallery assets.

---

## 🛠️ Technology Stack

*   **Core**: React 19, TypeScript 6.0, Vite 8.2 (with Rolldown engine)
*   **Styling**: Tailwind CSS v4 (using native `@theme` directives in CSS)
*   **State Management**: Zustand 5.0 (with LocalStorage synchronizers)
*   **Animation**: Framer Motion 12.0
*   **Icons**: Lucide React
*   **Linting**: Oxlint

---

## ⚙️ Development & Build Setup

### Prerequisites
*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Running Locally
To launch the Vite hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Build for Production
To check types and compile the optimized static production bundle:
```bash
npm run build
```
Build outputs are generated in the `/dist` directory.

### Code Quality (Linting)
To run the high-speed Oxlint linter:
```bash
npm run lint
```

---

## 🐳 Docker Deployment

The project is pre-configured with a multi-stage Docker build for easy Nginx distribution:

1.  **Build Docker Image**:
    ```bash
    docker build -t apextech-platform .
    ```
2.  **Run Container via Docker Compose**:
    ```bash
    docker-compose up -d
    ```
    This serves the built bundle via Nginx on port `80` (or the configured compose port).
