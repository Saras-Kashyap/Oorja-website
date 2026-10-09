# OORJA — Scintillating the Aura 🌟
### The Cultural Club of COER University, Roorkee

> **"Where energy meets expression, creativity meets culture, and every moment becomes an unforgettable experience."**

---

## 🎨 Hero Design Recreation & Architecture

The hero design has been crafted by adapting the provided **Afrowave Festival** layout reference while incorporating the official **OORJA** branding and **COER University** cultural identity:

1. **Exact Composition & Spatial Hierarchy**:
   - **Top Navigation Bar**: Floating glassmorphism navbar with official OORJA emblem, centered active-indicator navigation, and a radiant gradient CTA.
   - **Location & Affiliation Tracker**: `COER UNIVERSITY • ROORKEE` tracking header badge above the main headline.
   - **Dominant Headline**: Majestic typography featuring **OORJA** / **Oaaja** in radiant gold metallic gradient (`#fffaf0` to `#d4993a`) with glowing text shadows.
   - **Tagline**: *"Scintillating the Aura"* in Cormorant Garamond italic serif with dual gradient separator lines.
   - **Supporting Narrative**: Exact copy hierarchy: *"Where energy meets expression... An immersive world of curious talent, magical performances, and stories waiting to be discovered."*
   - **Date & Venue Pill Row**: `📅 24–28 OCT 2026` & `📍 COER University Campus, Roorkee`.
   - **Glassmorphic Countdown Timer**: 4 rounded frosted glass containers (`04 DAYS` | `10 HOURS` | `28 MIN` | `36 SEC`) with real-time countdown.
   - **Dual CTAs**:
     - Primary: Glowing gradient pill button `EXPLORE EVENTS →`
     - Secondary: Dark frosted glass pill button with play icon `JOIN OORJA ▶`
   - **Atmospheric Staging**:
     - Upward-shooting amber/gold and magenta/purple stage beams
     - Intricate golden geometric/sacred arch frames on the left and right flanks
     - Silhouette of an energized festival crowd with raised hands along the bottom
     - Floating luminous golden ember motes and particles
     - Tracked `SCROLL DOWN` indicator with an animated double chevron `∨`.

---

## 🏛️ Verified COER University Context
All official institutional facts from [coeruniversity.ac.in](https://coeruniversity.ac.in/):
- **Full Name**: COER University *(formerly College of Engineering Roorkee, COER)*
- **Campus Address**: 7th km on Roorkee–Haridwar Road, Vardhmanpuram, Roorkee – 247 667, Distt. Haridwar, Uttarakhand, India
- **Map Coordinates**: `29.8923, 77.9576` *(integrated in interactive Google Maps iframe and "Get Directions" link)*
- **Helpline Phone**: `+91 80705 00600` *(COER University Helpline)*
- **Helpline Email**: `admission@coeruniversity.ac.in`
- **Legacy & Campus**: Founded in 1998, 27-year legacy, 75-acre green campus, 13 colleges, 80+ programs, 16,000+ alumni.
- **Club Placeholders**: OORJA's own email (`oorja.club@coeruniversity.ac.in [placeholder]`) and Instagram (`@oorja_coeru [placeholder]`) are clearly marked.

---

## 📂 Project Structure

```
oorjaclub/
├── src/
│   ├── assets/
│   │   └── oorja-logo.png         # Official OORJA logo (proportions strictly preserved)
│   ├── components/
│   │   ├── Navbar.jsx             # Sticky glassmorphic navbar with active section highlight
│   │   ├── Hero.jsx               # Reference-accurate hero section with countdown & beams
│   │   ├── About.jsx              # "MORE THAN A CLUB", 4 core values & campus stats strip
│   │   ├── Events.jsx             # Signature events showcase (ZION, DEEP SANDHYA, FRESHER)
│   │   ├── EventCard.jsx          # Individual card with unique visual styling & animations
│   │   ├── EventModal.jsx         # Accessible modal with schedule highlights & registration
│   │   ├── Countdown.jsx          # Reusable 4-unit countdown timer
│   │   ├── FresherSpecial.jsx     # "THE NEW CHAPTER BEGINS" Aarambh welcome section
│   │   ├── Gallery.jsx            # "MOMENTS THAT GLOW" masonry grid + interactive lightbox
│   │   ├── Team.jsx               # "THE PEOPLE BEHIND OORJA" leadership council cards
│   │   ├── Contact.jsx            # Validated form, helpline contacts & Google Map embed
│   │   ├── Footer.jsx             # COER affiliation, quick links, socials, builder credit
│   │   └── SocialIcons.jsx        # Handcrafted pixel-perfect SVG brand icons
│   ├── data/
│   │   ├── college.js             # COER University verified details, config & values
│   │   └── events.js              # Events, gallery archives, and student council data
│   ├── pages/
│   │   ├── Home.jsx               # Complete one-page experience
│   │   └── EventDetails.jsx       # Dedicated route for individual events
│   ├── App.jsx                    # React Router configuration
│   ├── main.jsx                   # React application mount
│   └── index.css                  # Tailwind CSS, custom glows, and stage lighting tokens
├── server/
│   └── index.js                   # Node.js + Express backend scaffold with mock endpoints
├── public/
│   └── oorja-logo.png             # Official OORJA logo in root public directory
├── vite.config.js                 # Vite + React + Tailwind v4 config
└── package.json                   # Project dependencies and scripts
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Make sure **Node.js** (v18+) and **npm** are installed on your machine.

### 2. Frontend (React + Vite)
Start the frontend development server:
```bash
# Install dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to experience the site.

### 3. Backend (Node.js + Express Scaffold)
Start the backend API server in a separate terminal:
```bash
# Start the Express server
npm run server
```
The API server will listen on **[http://localhost:5000](http://localhost:5000)**.
Available endpoints:
- `GET  /api/health` — Status and college metadata
- `GET  /api/events` — Cultural event catalog
- `POST /api/contact` — Message submission endpoint
- `POST /api/events/register` — Event ticket/guestlist registration endpoint

### 4. Production Build
```bash
npm run build
npm run preview
```
