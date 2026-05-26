# 🚗 Harpo Automotives Website

Premium prestige car dealership website for Harpo Automotives, Northern Ireland.

---

## 📁 Project Structure

```
harpo-automotives/
├── public/
│   └── favicon.svg          ← Website favicon
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   ← Top nav + mobile hamburger menu
│   │   ├── Footer.jsx       ← Site footer
│   │   ├── VehicleCard.jsx  ← Vehicle listing card
│   │   └── UI.jsx           ← Shared buttons, form inputs, page headers
│   ├── pages/
│   │   ├── HomePage.jsx     ← Full homepage with all sections
│   │   ├── InventoryPage.jsx     ← Vehicle listings with filters
│   │   ├── VehicleDetailPage.jsx ← Individual vehicle page
│   │   ├── SellPage.jsx     ← Sell your car form
│   │   ├── FinancePage.jsx  ← Finance options + enquiry
│   │   ├── AboutPage.jsx    ← About the dealership
│   │   └── ContactPage.jsx  ← Contact form + info
│   ├── data/
│   │   └── vehicles.js      ← ⭐ EDIT THIS FILE TO UPDATE CARS + TESTIMONIALS
│   ├── App.jsx              ← Main app with page routing
│   ├── main.jsx             ← Entry point
│   └── index.css            ← Global styles + Google Fonts
├── index.html               ← HTML entry with SEO meta tags
├── vite.config.js           ← Vite configuration
├── vercel.json              ← Vercel deployment config
└── package.json
```

---

## ✏️ How to Edit Vehicles

**All vehicle data lives in one file: `src/data/vehicles.js`**

### Adding a New Vehicle

Copy this template and add it to the `vehicles` array:

```js
{
  id: 7,                    // Unique number — increment from last ID
  year: 2023,
  make: "Ferrari",
  model: "296 GTB",
  trim: "Assetto Fiorano",
  price: 285000,            // Price in GBP (no £ symbol)
  mileage: 1200,            // In miles
  fuel: "Hybrid",           // Petrol | Diesel | Hybrid | Mild Hybrid | Electric
  transmission: "Automatic", // Automatic | Manual
  engine: "3.0L Turbocharged V6",
  power: "830 bhp",
  color: "Rosso Corsa",
  doors: 2,
  seats: 2,
  bodyType: "Coupé",
  featured: true,           // true = shows on homepage featured section
  badge: "New Arrival",     // Optional badge text (or remove this line)
  image: "https://your-image-url.com/car.jpg",  // Main image URL
  gallery: [                // Array of image URLs for the gallery
    "https://your-image-url.com/car-1.jpg",
    "https://your-image-url.com/car-2.jpg",
    "https://your-image-url.com/car-3.jpg",
  ],
  description: "Write your vehicle description here...",
  features: [
    "Carbon Fibre Interior Pack",
    "Racing Seats",
    // Add as many as you want
  ],
},
```

### Using Your Own Images

**Option 1 — External URL (recommended for quick start):**
```js
image: "https://your-storage.com/car-photo.jpg"
```

**Option 2 — Local files:**
1. Create a folder: `public/images/`
2. Put your image in there: `public/images/ferrari-296.jpg`
3. Reference it as: `image: "/images/ferrari-296.jpg"`

### Removing a Vehicle
Simply delete the entire vehicle object (from `{` to `},`) from the array.

### Editing Testimonials
Scroll down in `src/data/vehicles.js` to find the `testimonials` array. Edit names, ratings, and text freely.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 16+ installed (download from [nodejs.org](https://nodejs.org))

### Install & Run

```bash
# 1. Navigate into the project folder
cd harpo-automotives

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Your site will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready to deploy anywhere.

---

## 📤 How to Upload to GitHub

### First time setup

```bash
# 1. Go to github.com and create a new repository called "harpo-automotives"
#    (don't initialise with README)

# 2. In your project folder, run:
git init
git add .
git commit -m "Initial commit — Harpo Automotives website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/harpo-automotives.git
git push -u origin main
```

### After making changes

```bash
git add .
git commit -m "Updated vehicle inventory"
git push
```

---

## ⚡ Deploy to Vercel (Free)

### Method 1 — Vercel Dashboard (easiest)

1. Go to [vercel.com](https://vercel.com) and sign up (free) with your GitHub account
2. Click **"New Project"**
3. Import your `harpo-automotives` GitHub repository
4. Vercel will auto-detect it as a Vite project
5. Click **"Deploy"** — done! You'll get a live URL instantly

### Method 2 — Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# In your project folder:
vercel

# Follow the prompts. Your site will be live in seconds.
```

### Custom Domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `harpoautomotives.com`)
3. Update your domain's DNS settings as shown

### Auto-deploy on Changes

Once connected to GitHub, every `git push` will automatically deploy a new version to Vercel. No action needed.

---

## 🎨 Customisation

### Colours
The gold accent colour (`#D4AF37`) and dark background (`#08080A`) are used throughout. To change them, use Find & Replace across all files.

### Business Details
- **Phone**: Search for `07342252057` — replace with your number
- **Email**: Search for `crwh02@icloud.com` — replace with your email
- **Address**: Update in `Footer.jsx` and `ContactPage.jsx`

### SEO
Edit `index.html` to update the page title, description, and Open Graph image with your own details.

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 4** — Build tool (fast dev server + optimised builds)
- **Google Fonts** — Cormorant Garamond + Montserrat
- **Vanilla CSS-in-JS** — No CSS framework dependencies (pure inline styles)
- **Vercel** — Deployment platform

---

*Built for Harpo Automotives, Northern Ireland*
