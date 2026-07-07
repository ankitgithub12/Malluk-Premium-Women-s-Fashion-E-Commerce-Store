# Malluk — Premium Women's Fashion E-Commerce Store

Malluk is an award-winning, editorial-inspired luxury fashion storefront dedicated to fluid, elegant, and timeless silhouettes. Handcrafted from organic mulberry silks, Mongolian cashmere, and fine Italian wools, the site replicates a high-end atelier shopping experience with immersive motion dynamics, responsive grids, and clean visual layouts.

---

## ✦ Key Premium Features

*   **Luxury Editorial Visuals:** Complete portrait-oriented aspect ratios (`aspect-[3/4]`) designed for high-fashion catalog display without cropping key suit and dress details.
*   **Ken Burns Landing Hero:** Immersive homepage backdrop featuring slow panning/zooming imagery, scroll-based text parallax, and clean scrolling chevrons.
*   **Glassmorphism Glass Layering:** Frosted glass headers, search overlays, and side-panels utilizing custom backdrop filters (`glass-light`, `glass`, `glass-dark`) with subtle gold border highlights.
*   **Shimmer Highlights:** Sweep animations overlaying primary call-to-actions, discount tags, and active card blocks.
*   **Animated Route Transitions:** Seamless crossfade and scale-blur transitions handled asynchronously between pages.
*   **Staggered Entrance Reveals:** Sequential loading of navigation items, lookbooks, product cards, and testimonials.
*   **Interactive Cart Celebration:** Custom confetti simulation burst triggered upon successful order authorization.
*   **Concierge Services Support:** Height-animated FAQs, bespoke WhatsApp ordering integration, and floating focus input forms.

---

## 🛠️ Technology Stack

*   **Frontend Library:** [React.js](https://react.dev/) (Functional Components, Hook States, Shared Context API)
*   **Build Tool & Dev Server:** [Vite](https://vitejs.dev/) (Fast Hot Module Replacement)
*   **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) (Custom `@theme` overrides, native CSS variable injection)
*   **Animation System:** [Framer Motion](https://www.framer.com/motion/) (AnimatePresence, Layout animations, viewport reveals)
*   **Iconography:** [Lucide React](https://lucide.dev/) (Bespoke stroke widths and clean icons)

---

## 📦 File Architecture

```
client/
├── public/                 # Static brand assets
├── src/
│   ├── assets/             # Editorial imagery, lookbook suits, and brand logos
│   ├── components/         # Reusable modules (Navbar, Hero, ProductCard, Footer, etc.)
│   ├── context/            # ShopContext (localStorage caching, Cart & Wishlist states)
│   ├── data/               # Local mock product database & FAQ definitions
│   ├── pages/              # Primary route views (Shop, Cart, Collections, About, FAQ, etc.)
│   ├── App.jsx             # Luxury Loading Screen, routing, and Page Transitions
│   ├── index.css           # Global custom styles (scrollbar, shimmers, keyframes)
│   └── main.jsx            # React root mount definition
├── package.json            # Script commands & dependency specifications
└── vite.config.js          # Vite build options
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository to your local workstation.
2. Navigate into the client directory:
   ```bash
   cd client
   ```
3. Install package dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server (typically running at `http://localhost:5173/`):
```bash
npm run dev
```

### Production Build

To compile a minified, production-ready static bundle inside the `/dist` directory:
```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```
