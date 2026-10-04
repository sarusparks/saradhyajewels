# Saradhya Jewels

Saradhya Jewels is a luxury Indian jewelry e-commerce platform built with React + Vite on the frontend and Express + Prisma on the backend.

---

## Project Structure

```text
saradhyajewels/
├── client/              # Standalone Frontend (React + Vite + Tailwind CSS)
│   ├── src/             # Frontend source code
│   ├── public/          # Static assets & images
│   ├── vercel.json      # Vercel SPA routing configuration
│   ├── .env.example     # Environment variable template
│   └── package.json     # Frontend dependencies & scripts
│
├── server/              # Standalone Backend (Express + Prisma + JWT)
│   ├── src/             # Express controllers, routes & middleware
│   ├── prisma/          # Database schema & migrations
│   ├── .env.example     # Backend environment template
│   └── package.json     # Backend dependencies & scripts
│
├── vercel.json          # Root Vercel fallback configuration
└── package.json         # Monorepo root dev scripts
```

---

## Deploying Frontend to Vercel

When importing this repository into [Vercel](https://vercel.com):

1. **Import Project**: Select the GitHub repository `sarusparks/saradhyajewels`.
2. **Root Directory**:
   - In the "Root Directory" section, click **Edit** and choose `client`.
3. **Build & Output Settings**:
   - Framework Preset: **Vite** (detected automatically)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   - `VITE_API_URL`: Set this to your deployed backend URL (e.g. `https://your-api.onrender.com`).
5. **Deploy**: Click **Deploy**. Vercel will automatically build and serve your frontend with full single-page application (SPA) routing support.

---

## Local Development

### Option A: Run Both Together (from Root)
```bash
npm install
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

### Option B: Run Frontend Separately
```bash
cd client
npm install
npm run dev
```

### Option C: Run Backend Separately
```bash
cd server
npm install
npm run dev
```
