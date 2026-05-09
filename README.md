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
- **Database:** PostgreSQL.
- **Deployment:** Docker, Nginx (Production-ready).

## 🐳 Quick Start with Docker

The easiest way to get TrackForce up and running is using Docker.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AkankshaRaj07/TrackForce.git
   cd TrackForce
   ```

2. **Start the platform:**
   ```bash
   docker-compose up -d
   ```

The platform will be available at:
- **Frontend:** http://localhost (Port 80)
- **Backend API:** http://localhost:5000

## 👨‍💻 Local Development

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
