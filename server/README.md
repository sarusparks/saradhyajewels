# Saradhya Jewels — Backend

Backend REST API for Saradhya Jewels, built with **Express.js**, **Prisma ORM**, **PostgreSQL**, **JWT Authentication**, and **Razorpay**.

## Setup & Running

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

## CORS Configuration

The backend CORS handler allows:
- Local development (`http://localhost:5173`, `http://localhost:3000`)
- Any `CLIENT_URL` provided in your `.env` (supports comma-separated list of origins)
- All Vercel deployments (`*.vercel.app`)
