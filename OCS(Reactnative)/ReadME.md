# 🚗 CSO – Online Car Service Station

A full‑stack **Online Car Service Station** application built using **Node.js + MySQL** for backend APIs and **React Native (Expo)** for the mobile frontend. The system allows users to book car services, track booking status, communicate via messages, and view receipts, while admins can manage users, bookings, and view statistics.

---

## 📌 Features Overview
S
### 👤 User Features

* User Registration & Login (JWT Authentication)
* Profile Management
* Browse Available Services
* View Service Stations
* Book Car Services
* Track Booking Status
* View Booking History
* Messaging related to bookings
* View Receipts

### 🛠️ Admin Features

* View All Users
* View All Bookings
* Update Booking Status
* View System Statistics (Users, Bookings, Revenue)

---

## 🧱 Backend Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **MySQL** – Relational database
* **mysql2** – MySQL driver
* **JWT (jsonwebtoken)** – Authentication & Authorization
* **bcrypt / bcryptjs** – Password hashing
* **dotenv** – Environment variables
* **cors** – Cross‑Origin Resource Sharing
* **multer** – File upload handling
* **express-validator** – Request validation

---

## 📱 Frontend Tech Stack (React Native)

* **React Native** – Mobile app framework
* **Expo** – Development & build platform
* **Expo Router** – File‑based navigation
* **React Navigation** – App navigation
* **React Native Paper** – UI components
* **AsyncStorage** – Local storage
* **Expo Vector Icons / Lucide Icons** – Icons
* **TypeScript** – Type safety

---

## 🗄️ Database Design

### Tables Used

* users
* bookings
* booking_status_history
* services
* stations
* station_service_prices
* messages
* receipts

### Relationships

* User → Bookings (One‑to‑Many)
* Booking → Status History (One‑to‑Many)
* Station ↔ Services (Many‑to‑Many)
* Booking → Messages (One‑to‑Many)
* Booking → Receipt (One‑to‑One)

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed using bcrypt
3. On login, JWT token is generated
4. Token is required for protected APIs
5. Role‑based access for Admin routes

---

## 📂 Backend API Modules

### Auth APIs

* Register User
* Login User
* Get Profile
* Update Profile

### Booking APIs

* Create Booking
* Get My Bookings
* Get Booking By ID
* Update Booking Status

### Service APIs

* Get All Services
* Get Service By ID
* Get Services By Station

### Station APIs

* Get All Stations
* Get Station By ID

### Admin APIs

* Get All Users
* Get All Bookings
* Get Statistics

---

## 📁 Project Structure (Backend)

```
backend/
│── controllers/
│── routes/
│── middlewares/
│── utils/
│── .env
│── server.js
```

---

## 📁 Project Structure (Frontend)

```
app/
│── (auth)/
│── (tabs)/
│── admin/
│── components/
│── services/
│── utils/
│── app.json
```

---

## 📊 Statistics Module

* Total Users Count
* Total Bookings Count
* Total Revenue Generated

---

## 🧪 Security Practices

* Password hashing
* JWT token authentication
* Role‑based authorization
* Input validation
* Secure environment variables

---

## 🚀 How to Run Project

### Backend

```bash
npm install
node server.js
```

### Frontend

```bash
npm install
expo start
```

---

## 📌 Future Enhancements

* Online Payments Integration
* Push Notifications
* Rating & Reviews
* Admin Dashboard UI
* Vehicle Service History

---

## 👨‍💻 Developer

**Pranjal Chirmade**
CDAC – PG‑DMC

---

⭐ This project is developed for academic & learning purposes.
