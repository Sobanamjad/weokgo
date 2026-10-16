# Weokgo - Dynamic Website with Admin Panel

## 🚀 Quick Start

Run all services at once:
```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Main Website + Admin Panel**: http://localhost:5173

## 📁 Project Structure

```
weokgo/
├── backend/          # Express.js + PostgreSQL
│   ├── server.js     # API server
│   ├── schema.sql    # Database schema
│   └── .env          # Database configuration
└── frontend/         # Main website (React) with built-in Admin Panel
    └── src/
        ├── App.jsx
        ├── components/pages/Admin.jsx  # Built-in admin panel
        └── context/SiteContext.jsx
```

## 🔧 Individual Services

### Backend only
```bash
npm run backend
```

### Main frontend only
```bash
npm run frontend
```

## 🗄️ Database Setup

Database already created: `weokgo`

To recreate the database:
```bash
psql -d postgres -c "DROP DATABASE weokgo;"
psql -d postgres -c "CREATE DATABASE weokgo;"
psql -d weokgo -f backend/schema.sql
```

## 📝 API Endpoints

- `GET /api/health` - Health check
- `GET /api/site-data` - Get all site data
- `GET /api/site-data/:section` - Get specific section
- `PUT /api/site-data/:section` - Update section

## 🎨 Admin Panel

Access the admin panel at: **http://localhost:5173/admin**

**Default password**: `admin123`

### Features:
- Edit Header (site name, menu, CTA buttons)
- Edit Hero Section (title, description, image)
- Edit Services Section (service cards)
- Edit CTA Banner
- Edit Footer
- Edit Contact Info (phones, addresses)
- Dynamic Pages management
- RSS Feeds configuration

All changes are saved to PostgreSQL and immediately reflected on the main website.

## 🔑 Environment Variables

Backend `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=weokgo
DB_USER=macpro
DB_PASSWORD=
PORT=5000
```
