# Saradhya Jewels — Frontend

Frontend application for Saradhya Jewels, built with **React 18**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Zustand**.

## Vercel Deployment

This folder is configured for seamless deployment to Vercel:

- Includes `vercel.json` with SPA routing rewrite (`/(.*) -> /index.html`) so route refreshes work seamlessly.
- Configured with `api.js` client respecting `VITE_API_URL`.

### Setup
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```
The output will be generated in `dist/`.

### Environment Variables
Copy `.env.example` to `.env`:
```bash
VITE_API_URL=https://your-backend-api-url.com
```
In local development, leave it blank to proxy `/api` to `http://localhost:4000`.
