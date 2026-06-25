# 🛒 KGP Marketplace — Frontend

<div align="center">

![KGP Marketplace](https://img.shields.io/badge/KGP-Marketplace-1e3a8a?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A peer-to-peer campus marketplace for IIT Kharagpur students**

[🌐 Live Demo](https://kgp-makertplace-frontend.vercel.app/) · [⚙️ Backend Repo](https://github.com/Abhi27-27/KGP-Makertplace-backend) · [🐛 Report Bug](https://github.com/Abhi27-27/KGP-Makertplace-Frontend/issues)

</div>

---

## 📌 Overview

KGP Marketplace is a full-stack web application that enables IIT Kharagpur students to buy and sell items — cycles, books, electronics, and academic essentials — within the campus community. This repository contains the **React frontend**.

---

## 🚀 Live Demo

> **Deployed on Vercel:** [https://kgp-makertplace-frontend.vercel.app/](https://kgp-makertplace-frontend.vercel.app/)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login and registration with roll number verification
- 🛍️ **Browse & Filter Listings** — Search by title and filter by category in real time
- 📦 **Create & Delete Listings** — Post items with title, price, category, location, and description
- 💬 **Real-Time Chat** — Socket.io-powered messaging between buyers and sellers
- 🔔 **Browser Notifications** — Instant alerts for new messages even when not on the chat page
- 🔴 **Unread Badge Counter** — Live unread message count shown in the navbar
- 📊 **Seller Dashboard** — View and manage all your active listings
- 📱 **Fully Responsive** — Mobile-first design with a hamburger menu

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| Real-Time | Socket.io Client |
| State Management | React Context API |
| HTTP | Fetch API |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navbar with unread badge
│   ├── Footer.jsx          # Site footer with quick links
│   └── LoadingSpinner.jsx  # Global loading overlay
├── context/
│   ├── ChatContext.jsx     # Socket.io + conversations state
│   └── LoadingContext.jsx  # Global loading state
├── pages/
│   ├── Home.jsx            # Browse & filter listings
│   ├── ProductDetails.jsx  # Single product view + chat CTA
│   ├── CreateListing.jsx   # New listing form
│   ├── Dashboard.jsx       # User's listings management
│   ├── Auth.jsx            # Login / Sign up
│   └── Chat.jsx            # Real-time messaging UI
└── utils/
    ├── api.js              # API base URL + auth headers helper
    └── categoryStyles.js   # Category gradient/icon/color map
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see [Backend Repo](https://github.com/Abhi27-27/KGP-Makertplace-backend))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Abhi27-27/KGP-Makertplace-Frontend.git
cd KGP-Makertplace-Frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

> For production, set `VITE_API_URL` to your deployed backend URL.

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 🔗 Backend

This frontend connects to the KGP Marketplace REST API + WebSocket server.

> **Backend Repository:** [https://github.com/Abhi27-27/KGP-Makertplace-backend](https://github.com/Abhi27-27/KGP-Makertplace-backend)

Make sure the backend is running before starting the frontend locally.

---

## 🚢 Deployment

This project is deployed on **Vercel**. The `vercel.json` rewrite rule ensures all routes fall back to `index.html` for client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---


<div align="center">
Made by <a href="https://github.com/Abhi27-27">Marreddy Abhiram Muni Reddy</a> · IIT Kharagpur
</div>
