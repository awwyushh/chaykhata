# ChayKhata ☕

> Friendship fades. Chay debt stays.

Track who owes you chai, lunch, or snacks. Share your personal link. Never forget a debt again.

---

## Stack

- **Frontend/Backend**: React Router v7 (Remix successor) + TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion + Glassmorphism UI
- **Database**: Neon PostgreSQL + Prisma v7 + pg adapter
- **Auth**: PIN-based (bcryptjs) + cookie sessions
- **Deploy**: Vercel-ready

---

## Local Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd chaykhata
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="postgresql://neondb_owner:YOUR_PASS@ep-xxx.neon.tech/neondb?sslmode=require&channel_binding=require"
SESSION_SECRET="your-random-secret-at-least-32-chars"
```

### 3. Database Setup

```bash
# Push schema to DB (dev, no migration files)
npm run db:push

# Or create & run a migration
npm run db:migrate

# Seed with test data (optional)
npm run db:seed
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:5173

---

## Test Accounts (after seeding)

| Username | PIN  | Name         |
|----------|------|--------------|
| ayush    | 1234 | Ayush Shukla |
| rahul    | 5678 | Rahul Verma  |
| priya    | 9012 | Priya Sharma |
| arjun    | 3456 | Arjun Patel  |

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial ChayKhata"
git remote add origin https://github.com/YOUR_USERNAME/chaykhata.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to vercel.com → New Project
2. Import the GitHub repo

### 3. Environment Variables (Vercel Dashboard)

```
DATABASE_URL   = postgresql://...your-neon-connection-string...
SESSION_SECRET = your-random-32+-char-secret
NODE_ENV       = production
```

### 4. Build Command (already in vercel.json)

```
npx prisma generate && npx prisma migrate deploy && npm run build
```

### 5. Deploy

Vercel auto-deploys on every push to main.

---

## Project Structure

```
chaykhata/
├── app/
│   ├── components/
│   │   ├── ui/           # button, input, badge
│   │   ├── layout/       # Navbar
│   │   ├── ChaiCup.tsx   # animated SVG mascot
│   │   ├── DebtCard.tsx
│   │   └── ConfettiEffect.tsx
│   ├── lib/
│   │   ├── db.server.ts       # Prisma client (pg adapter)
│   │   ├── auth.server.ts     # PIN hashing
│   │   ├── session.server.ts  # Cookie sessions
│   │   └── utils.ts
│   ├── routes/
│   │   ├── _index.tsx         # Landing page
│   │   ├── auth.tsx           # Login/Signup
│   │   ├── dashboard/
│   │   │   ├── index.tsx      # Main dashboard
│   │   │   ├── analytics.tsx  # Charts & leaderboard
│   │   │   └── settings.tsx   # Profile & PIN change
│   │   ├── $username.tsx      # Public profile page
│   │   ├── debt.$id.tsx       # Debt detail
│   │   └── api.logout.tsx
│   ├── root.tsx
│   └── app.css                # Chai theme + glassmorphism
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── favicon.svg
│   └── manifest.webmanifest   # PWA manifest
├── vercel.json
└── .github/workflows/ci.yml   # CI: typecheck + build
```

---

## npm Scripts

```bash
npm run dev                # Dev server (localhost:5173)
npm run build              # Production build
npm run start              # Serve production build
npm run typecheck          # TS check
npm run db:push            # Push schema to DB (dev, no migration history)
npm run db:migrate         # Create & run migration (dev)
npm run db:migrate:deploy  # Apply pending migrations (production)
npm run db:studio          # Prisma Studio GUI
npm run db:seed            # Seed test accounts & debts
```

---

## Features

- Public profile pages at `/username`
- Add chai / lunch / snacks / custom debts
- Mark debts as paid (confetti 🎉)
- Dashboard with stats and filters
- Analytics: monthly bar chart, item pie chart, top debtors leaderboard
- 4-digit PIN auth with session cookies
- Share link + copy to clipboard
- PWA installable
- Mobile-first responsive UI
- Warm chai dark theme + glassmorphism cards
