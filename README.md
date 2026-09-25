# 🚀 LostFound+ — Smart Lost & Found Platform

![LostFound+ Banner](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200)

**LostFound+** is a fully functional, MERN-stack web application designed to solve the chaos of lost and found management in colleges and organizations. It replaces fragmented WhatsApp groups and physical notice boards with a centralized, smart, and secure digital platform.

Built for the **MongoDB Tech-Odyssey Hackathon**, this project focuses on **real-world usability, beautiful UI/UX, and robust backend logic**.

---

## ✨ Key Features

*   **Smart Match Engine:** A custom algorithmic engine built with MongoDB aggregation that automatically suggests potential matches between lost and found items based on category, location, date, brand, and color.
*   **Secure Claim System:** Users can submit ownership claims with proof. Admins review claims to prevent fraudulent takeovers.
*   **Role-Based Access Control (RBAC):** Dedicated Admin Dashboard with platform statistics, recent activity feeds, and full moderation controls (Approve/Reject claims and reports).
*   **Beautiful UI/UX:** A modern, dark-themed interface with glassmorphism, responsive design, and instant toast notifications.
*   **Intelligent Image Uploads:** Direct-to-Cloudinary image uploading for high-performance content delivery.

---

## 🏗️ Technology Stack

*   **Frontend:** React (Vite), React Router v6, Tailwind CSS, React Hot Toast
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Native Driver — *No Mongoose*)
*   **Authentication:** JWT (JSON Web Tokens), bcryptjs
*   **Storage:** Cloudinary

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB running locally or a MongoDB Atlas URI

### 2. Installation

Clone the repository:
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd newlostfound+
```

Install Backend Dependencies:
```bash
cd backend
npm install
```

Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the **`backend/`** directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=lostfoundplus
JWT_SECRET=super_secret_jwt_key_12345
# Cloudinary (Optional - will use placeholders if left empty)
CLOUDINARY_CLOUD_NAME=REPLACE_ME
CLOUDINARY_API_KEY=REPLACE_ME
CLOUDINARY_API_SECRET=REPLACE_ME
```

### 4. Seed the Database (Highly Recommended)
We have provided a seed script that populates the database with demo users, items, and AI-generated placeholder images.

```bash
cd backend
node seed.js
```

**Demo Credentials:**
*   Admin: `admin@lostfound.dev` / Password: `Admin@1234`
*   User: `alice@example.com` / Password: `User@1234`

### 5. Start the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 📂 Project Structure

```text
/
├── backend/                  # Express server
│   ├── config/               # Database & Cloudinary config
│   ├── controllers/          # Route logic & algorithms
│   ├── middleware/           # Auth, RBAC, Error Handling
│   ├── routes/               # API endpoints
│   ├── utils/                # Password hashing, ObjectId parsing
│   └── seed.js               # Database population script
│
└── frontend/                 # React application
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context (Auth)
    │   ├── layouts/          # Page wrappers (Main, Admin)
    │   ├── pages/            # Core views (Dashboard, Items, etc)
    │   └── services/         # Axios API interceptors
    └── index.css             # Tailwind & Custom styles
```

---

## 👨‍💻 Built By
Created for the **MongoDB Tech-Odyssey Hackathon**.
