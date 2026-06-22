# KGP Marketplace - Frontend 🛒

A dedicated real-time campus marketplace built for the IIT Kharagpur (KGP) community. Students can securely buy, sell, and negotiate campus essentials like cycles, books, mattresses, and electronics using a real-time built-in chat engine.

🔗 Quick Links

🌍 Live Application: [Visit the Deployed Site](https://kgp-makertplace-frontend.vercel.app/)
⚙️ Backend API Repository: [KGP-Makertplace-backend](https://github.com/Abhi27-27/KGP-Makertplace-backend)

---

## ✨ Features

* **Real-Time Chat System:** Integrated WebSockets (`socket.io-client`) for instant buyer-seller communication with optimistic UI updates and unread message counters.
* **Campus-Exclusive Categories:** Filter and search items by specific student needs (Cycles, Books, Electronics, Academics).
* **Secure Authentication:** JWT-based user login and registration flows.
* **Protected Routes:** Dedicated user dashboard for managing active listings and chat histories.
* **Modern UI/UX:** Built with the latest Tailwind CSS v4 featuring glassmorphism, responsive design, and global loading state management.

## 🛠️ Tech Stack

* **Framework:** React 18 + Vite
* **Routing:** React Router v6
* **Styling:** Tailwind CSS v4
* **Real-Time Engine:** Socket.io-client
* **State Management:** React Context API (`ChatContext`, `LoadingContext`)

## 🚀 Local Setup & Installation

Follow these steps to run the frontend locally on your machine.

### Prerequisites
* Node.js (v18 or higher recommended)
* The Backend Server running locally.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/KGP-Marketplace-Frontend.git](https://github.com/YOUR_USERNAME/KGP-Marketplace-Frontend.git)
cd KGP-Marketplace-Frontend
