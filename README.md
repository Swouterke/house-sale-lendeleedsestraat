# Woningsite (React + Vite)

Een eenvoudige, moderne statische website in het Nederlands voor de verkoop van een woning.

## Installatie

```bash
npm install
```

## Lokaal starten

```bash
npm run dev
```

## Productiebouw

```bash
npm run build
```

De statische output staat daarna in `dist/`.

## GitHub Pages deploy

Omdat `vite.config.js` `base: './'` gebruikt, werkt de site goed als statische export op GitHub Pages.

### Optie A: Via GitHub Actions (aanbevolen)

1. Push deze code naar je GitHub-repository.
2. Maak het bestand `.github/workflows/deploy.yml` met een standaard Vite/Pages workflow.
3. Zet in GitHub bij Settings > Pages de bron op GitHub Actions.

### Optie B: Handmatig

1. Voer `npm run build` uit.
2. Publiceer de inhoud van `dist/` op een branch die door Pages wordt geserveerd.

## Inhoud aanpassen

- Woninginformatie: `src/App.jsx` (object `woning`).
- Fotogalerij: `src/App.jsx` (array `galerij`).
- Styling: `src/styles.css`.

Tip: zet je eigen foto\'s in `public/images/` en vervang de URL\'s in `galerij` door bijvoorbeeld `/images/gevel.jpg`.
