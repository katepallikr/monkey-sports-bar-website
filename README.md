# 5 Monkeys Sports Bar

Welcome to the official frontend repository for **5 Monkeys Sports Bar**—a premier sports and premium hookah lounge based in San Antonio, Texas. 

This project was completely modernized to reflect our "Jungle Luxe" brand identity. We overhauled the layout to ensure it looks incredible on mobile devices, integrated a ton of dynamic high-resolution photography, and streamlined the user experience so our customers can instantly find our menu, daily specials, and contact info.

## 🚀 Tech Stack

This site is built for speed and simplicity. It's a fully statically generated Single Page Application (SPA) driven by:

- **React 18 & TypeScript**: For a rock-solid, component-based UI.
- **Vite**: Our incredibly fast local development server and production bundler.
- **Tailwind CSS**: Powering the dark, moody "Jungle Luxe" aesthetic, glassmorphism UI elements, and complex responsive grid layouts.
- **Wouter**: A minimalist routing library handling our seamless page transitions without the heavy bloated footprint of React Router.
- **Radix UI**: Providing accessible, unstyled UI primitives (like our mobile navigation drawer).
- **FormSubmit API**: Catching our Careers and "5M Club" form submissions in the background and silently routing them to our operations email.

## 🌟 Key Features

- **Dynamic Daily Specials**: An elegant masonry-style grid that highlights our rotating drink and food specials (like Tequila Tuesdays and Karaoke Wednesdays).
- **Responsive "Jungle Luxe" UI**: We ditched the generic white backgrounds for a premium deep-dark aesthetic with neon orange accents. It works flawlessly across every device size.
- **Full Menu Integration**: The database is structured in local JSON (`client/public/data/menu.json`), fully mapped to 4K Unsplash photography.
- **FormSubmit Operations Pipeline**: Our "Join the Team" and "VIP 5M Club" forms ping data completely in the background via the FormSubmit AJAX API, meaning users never leave the site.
- **Live Sports Ecosystem**: The homepage features a fully responsive live sports ticker pulling pseudo-live game data.

## 💻 Running the Project Locally

If you want to spin up the site on your own machine to test changes:

1. **Install Dependencies:**
   Make sure you have Node installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be live at `http://localhost:5173`. You can edit components in `/client/src/pages` and see updates instantly without refreshing.

3. **Build for Production:**
   When you're ready to deploy to a live server (like Vercel, Netlify, or Render):
   ```bash
   npm run build
   ```
   This will bundle all your React code and optimize your high-res `assets` into a minified `dist` folder.

## 🤝 Maintenance & Data

If you need to update the menu items, prices, or daily specials, you don't need to know React! Simply go into the `client/public/data` folder and update `menu.json` or `specials.json`. The React app dynamically pulls and renders from these files, so your changes will instantly reflect on the site.
