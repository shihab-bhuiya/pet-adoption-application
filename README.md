# Paws & Hearts | Full-Stack Pet Adoption Platform

A robust, full-stack pet adoption portal built using the MERN stack. The platform bridges the gap between animal shelters/pet owners and individuals looking to adopt. Users can seamlessly browse available pets, filter by categories, and submit adoption requests. Pet owners have access to a dedicated management dashboard to track listings and process adoption applications securely.

**Live Website Link:** https://pet-adoption-application-chi.vercel.app

---

## 🚀 Purpose
The primary goal of **Paws & Hearts** is to streamline the pet adoption ecosystem, making it safer, more efficient, and accessible. By replacing fragmented social media posts with a structured CRUD-based system, the platform ensures that detailed pet profiles (including health and vaccination status) are transparently displayed, while secure authentication ensures genuine tracking of adoption requests.

---

## ✨ Features
*   **Advanced Search & Filtering:** Browse pets dynamically using regular expression (`$regex`) name search and category filtering (`$in`) for species like Dogs, Cats, Birds, and Rabbits.
*   **Comprehensive Dashboard Layout:** Features private dashboards split cleanly between *My Requests* (for adopters) and *My Listings* (for pet owners/shelters).
*   **Secure Adoption Controls:** Prevents pet owners from adopting their own listings. If multiple adoption requests exist for a pet, approving one automatically marks the pet as "Adopted" and locks further incoming requests.
*   **Robust Authentication System:** Includes custom Email/Password registration with strict password criteria, alongside seamless Google OAuth integration.
*   **Route Persistence:** Secure route handling ensuring that authenticated users are never redirected back to the login page upon browser hard-reloads.
*   **Fully Responsive UI:** A modern, clean, and recruiter-friendly aesthetic optimized across mobile, tablet, and desktop viewports with custom UI toast notifications (no native alerts).

---

## 🛠️ NPM Packages Used

### Client-Side (`/client`)
*   `react` & `react-dom` - Core frontend UI rendering
*   `react-router-dom` - Client-side routing & private route protection
*   `axios` - Promise-based HTTP client for secure API calls
*   `Better Auth` - Authentication provider (Google Login & Email/Password)
*   `react-hook-form` - Optimized form management and validation
*   `react-hot-toast` (or `react-toastify`) - Elegant UI-based notifications
*   `lucide-react` (or `react-icons`) - Modern UI icon packs


### Server-Side (`/server`)
*   `express` - Minimalist web framework for Node.js
*   `mongodb` - Official MongoDB driver for database interaction
*   `dotenv` - Secure environment variable management
*   `cors` - Cross-Origin Resource Sharing middleware
*   `jsonwebtoken` (JWT) - Secure stateless token generation and verification
*   `cookie-parser` - Parsing HTTPOnly cookies for secure token storage

---

## 🛠️ Local Installation & Setup

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB Atlas Account
*   Better Auth Project Setup

