# 🚀 TrackForce: Next-Gen Workforce Intelligence

TrackForce is a premium, enterprise-grade workforce management platform designed for high-security environments and dynamic field operations. Featuring real-time GPS tracking, biometric enrollment, and role-based analytics, TrackForce provides unprecedented visibility into your global operations.

## ✨ Features

- **💎 Ultra-Premium UI:** Built with React, Vite, and Framer Motion for a fluid, high-fidelity experience.
- **📱 Perfectly Responsive:** Fully optimized for Mobile, Tablet, and Desktop.
- **🛰️ Live Workforce Tracking:** Real-time GPS monitoring and site-specific presence verification.
- **🛡️ Role-Based Access Control:** Secure, isolated views for Super Admins and Field Employees.
- **📍 Geofencing:** Advanced visualization and alerts for unauthorized site exits.
- **📊 Intelligence Dashboard:** Actionable insights into attendance efficiency and hub performance.

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript, Vite, Lucide Icons, Framer Motion.
- **Backend:** Node.js, Express, Prisma ORM.
- **Database:** SQLite (Temporary for Development) / MySQL (Production).
- **Deployment:** Hostinger / Manual Deployment.

## 🚀 Quick Start (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AkankshaRaj07/TrackForce.git
   cd TrackForce
   ```

2. **Backend Setup:**
   - Go to `backend` folder.
   - Install dependencies: `npm install`.
   - The `.env` is pre-configured for **SQLite** (no setup needed).
   - Run `npx prisma generate`.
   - Run `npx prisma db push` (to create the local `dev.db` file).
   - Run `npx prisma db seed` (to add test data).
   - Start: `npm run dev`.

3. **Frontend Setup:**
   - Go to `frontend` folder.
   - Install dependencies: `npm install`.
   - Start: `npm run dev`.

## 👨‍💻 Deployment to Hostinger

If you prefer to run the services individually for development:

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔒 Security & Privacy

TrackForce is built with data isolation at its core. Employees can only view their personal performance and site assignments, while administrative data remains strictly accessible to Super Admins.

---
Built with ❤️ by the TrackForce Engineering Team.
