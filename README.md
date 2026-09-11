# Gregory Muryn-Mukha — Portfolio Clone

A faithful recreation of [murynmukha.com](https://murynmukha.com) including all subpages.

## Pages

- `/index.html` — Homepage (Services, Work, Experience, Publications, About)
- `/pages/voiceflow.html` — Voiceflow case study
- `/pages/chattermill.html` — Chattermill case study
- `/pages/invocable.html` — Invocable (coming soon)

## How to Run

### Option 1 — No install needed (recommended)
Open `index.html` directly in your browser.

> ⚠️ Note: Videos and some remote images load from murynmukha.com directly. You need an internet connection for those assets.

### Option 2 — Local dev server with live reload

Requires [Node.js](https://nodejs.org) installed.

```bash
# Install dependencies
npm install

# Start live-server with hot reload
npm run dev
```

Then open http://localhost:3000 in your browser.

### Option 3 — Simple static server

```bash
npm run start
```

Then open http://localhost:3000

### Option 4 — VS Code Live Server extension

1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Select **"Open with Live Server"**

## Structure

```
murynmukha/
├── index.html          # Homepage
├── package.json        # Dev server scripts
├── README.md
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactions (nav, copy, TOC)
└── pages/
    ├── voiceflow.html  # Case study
    ├── chattermill.html # Case study
    └── invocable.html  # Coming soon
```

## Notes

- All images and videos are loaded from the live murynmukha.com domain (no local copies needed)
- Fonts loaded from Google Fonts (requires internet)
- Fully responsive — works on mobile and desktop
