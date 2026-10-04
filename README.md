# Saradhya Jewels

Saradhya Jewels is a luxury Indian jewelry e-commerce platform.

---

## Project Structure

```text
saradhyajewels/
├── frontend/            # Standalone Frontend (React + Vite + Tailwind CSS)
│   ├── src/             # Frontend source code
│   ├── public/          # Static assets & images
│   ├── vercel.json      # Vercel SPA routing configuration
│   ├── .env.example     # Environment variable template
│   ├── .gitignore       # Frontend-specific gitignore
│   ├── package.json     # Frontend dependencies & scripts
│   └── README.md        # Frontend documentation
│
├── backend/             # Standalone Backend (Express + Prisma + JWT)
│   ├── src/             # Express controllers, routes & middleware
│   ├── prisma/          # Database schema & migrations
│   ├── .env.example     # Backend environment template
│   ├── .gitignore       # Backend-specific gitignore
│   ├── package.json     # Backend dependencies & scripts
│   └── README.md        # Backend documentation
│
├── .gitignore           # Repository root gitignore
└── README.md            # Repository documentation
```

---

## Deploying Frontend to Vercel

When importing this repository into [Vercel](https://vercel.com):

1. **Import Project**: Select the GitHub repository `sarusparks/saradhyajewels`.
2. **Root Directory**:
   - In the "Root Directory" section, click **Edit** and select **`frontend`**.
3. **Build & Output Settings**:
   - Framework Preset: **Vite** (detected automatically)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   - `VITE_API_URL`: Set this to your deployed backend URL (e.g., `https://your-api.onrender.com`).
5. **Deploy**: Click **Deploy**. Vercel will automatically build and deploy your frontend with SPA routing support configured in `frontend/vercel.json`.

---

## Local Development

Each folder is completely independent with its own `package.json` and dependencies:

### Running Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:5173`

### Running Backend
```bash
cd backend
npm install
npm run dev
```
Runs at: `http://localhost:4000`
