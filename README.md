# 🌿 Leaforia | Your Premium Indoor Plant Companion

Leaforia is a sophisticated full-stack platform designed for indoor plant lovers. It combines a seamless e-commerce experience with a community-driven article hub. Users can browse, purchase, and learn about plants, while administrators have complete control over inventory, user management, and order fulfillment.

**Live Site:** [https://leaforia-2c27a.web.app/](https://leaforia-2c27a.web.app/)

---

## 🔑 Admin Access (Fixed Credentials)

Leaforia uses a **Fixed Admin System** to ensure top-level security for store management. Only the user logged in with these specific credentials can access the Admin Dashboard:

- **Admin Email:** `admin@gmail.com`
- **Admin Password:** `admin@1234`

> **Security Note:** Access to the `/admin-dashboard` is protected by a specialized `AdminRoute` on the frontend and role-verification middleware on the backend to prevent unauthorized access.

---

## 🌟 Key Features

### 👤 User Capabilities

- **Dynamic Wishlist:** Add/remove plants from your wishlist with instant UI updates (Custom Event Synchronization).
- **Order Tracking:** Monitor the progress of purchases in the user dashboard (Pending vs. Approved).
- **Smart Newsletter:** Real-time welcome emails sent via EmailJS upon subscription.
- **Article Interaction:** Read plant care guides and participate in discussions through a dynamic comment system.
- **Profile Management:** Update personal information, track total purchase history, and reset passwords via Firebase.
- **Social Login:** Quick access using Google Authentication.

### 🛠 Admin Capabilities (Secure Dashboard)

- **Inventory Management:** Full CRUD operations (Add, Edit, Delete) for plant listings.
- **Content Creation:** Manage the "Care Articles" section to educate the community.
- **Order Fulfillment:** Review and approve user purchases to move them to the delivery stage.
- **User Moderation:** View all registered users and manage the community by removing accounts if necessary.
- **Admin Analytics:** Specialized dashboard to track total deliveries and sales performance.

---

## 🛡 Security & Protected Routes

- **Admin Protection:** A dedicated fixed-credential admin system ensures only authorized personnel can access the management suite.
- **Private Routes:** Sensitive pages (Dashboards, Order Details, Article Comments) are protected; users must be logged in to access them.
- **Backend Verification:** Secure API endpoints using `firebase-admin` to verify user identity and roles before performing database operations.

---

## 💻 Tech Stack

### Frontend

- **Framework:** React 19 (React Router 7)
- **Styling:** Tailwind CSS 4 & DaisyUI
- **Animations:** Framer Motion & Lottie React
- **Data Fetching:** Axios
- **Charts:** Recharts (for Dashboard Analytics)
- **Carousel:** Swiper & Slick Carousel
- **Feedback:** React Hot Toast

### Backend & Database

- **Runtime:** Node.js & Express.js
- **Database:** MongoDB
- **Security:** Firebase Admin SDK
- **Payments:** Stripe API
- **Mailing:** @emailjs/browser

---
