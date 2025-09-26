# ELARA

A full-stack personal finance tracker with authentication, income & expense management, a dashboard with charts, and CSV/Excel export.

---

##  Features

- **Email/password auth** with JWT set as **HTTP-only cookies** (secure, same-site).  
- **Protected routes** on the API via middleware that verifies the JWT from cookies.  
- **Income & Expenses** CRUD endpoints and UI pages.  
- **Dashboard** with charts (Recharts) for income/expense breakdowns.  
- **Excel/CSV download** for transactions.

---

##  Tech stack

- **Frontend:** React + React Router + Vite + Tailwind CSS + react-hot-toast + Recharts.  
- **Backend:** Node.js + Express + cookie-parser + CORS + dotenv + bcryptjs.  
- **Database:** MongoDB via Mongoose models.

---

##  Monorepo layout

```
ELARA/
├─ api/            # Node/Express API (auth, income, expenses, dashboard)
└─ client/         # React app (auth pages, dashboard, charts, exports)
```

- API sets up routes at `/api/auth`, `/api/income`, `/api/expenses`, and `/api/dashboard`.  
- Default dev ports: **API 5000**, **Client 5173**.

---

##  Getting started (local)

### Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string

### 1) Clone
```bash
git clone https://github.com/Feras-ALdemashki/ELARA.git
cd ELARA
```

### 2) Backend (API)
```bash
cd api
npm install
```

Create **`.env`** in `api/`:
```ini
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-strong-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the server:
```bash
npm start
```

The API enables CORS for `CLIENT_URL` and reads the auth token from **HTTP-only cookies**.

### 3) Frontend (Client)
```bash
cd ../client
npm install
npm run dev
```
Open `http://localhost:5173`.

---

##  Authentication flow

- On **login**, the server responds with user info and sets a **JWT in an HTTP-only cookie** (`secure` in production, `SameSite=Lax`, 1-day expiry).  
- Protected API handlers extract and verify the JWT from `req.cookies` and attach the user to `req.user`.

---

##  API overview (high level)

Base URL: `http://localhost:5000/api`

- `POST /auth/signup` – create account  
- `POST /auth/login` – set JWT cookie and return user info  
- `GET /auth/profile` – get current user (requires cookie)  
- `… /income` – income CRUD (protected)  
- `… /expenses` – expense CRUD (protected)  
- `GET /dashboard` – aggregated data for charts (protected)

> Notes: Routes are wired in `server.js`; detailed handlers live under `api/controllers/…`. Dashboard aggregation uses MongoDB aggregation for category/source summaries.

---

##  Dashboard & charts

The dashboard includes:
- **Income bar chart** (`IncomesBarChart.jsx`)  
- **Expenses pie chart** (`ExpensesPieChart.jsx`)  

Both are implemented with **Recharts**; income colors are generated with **chroma-js**.

---

##  Export

There’s a feature to **download an Excel/CSV sheet** of transactions from the client.

---

##  Scripts (typical)

**API**
- `npm start` – start Express server (reads `.env`, connects DB, enables CORS/cookies).

**Client**
- `npm run dev` – start Vite dev server at `5173`.


