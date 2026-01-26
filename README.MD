*ONLINE CAR SERVICE STATION

## Features
- User Registration & Login
- JWT-based Authentication
- Role-based Access (Admin/User)
- View & Update Profile
- Admin Dashboard (View all users)
- Secure REST APIs
- ---------------------------
##APIS-
"Auth": [
        "POST - Register",
        "POST - Login",
        "GET - Profile",
        "PUT - Update Profile"
    ],
    "Services": [
        "GET - Get All Services",
        "GET - Get Service By ID",
        "GET - Get Services by Station"
    ],
    "Stations": [
        "GET - Get All Stations",
        "GET - Get Station By ID"
    ],
    "Bookings": [
        "POST - Create Booking",
        "GET - Get My Bookings",
        "GET - Get Booking By ID",
        "PATCH - Update Booking Status"
    ],
    "Admin": [
        "GET - Get All Users",
        "GET - Get All Bookings",
        "GET - Get Statistics"
    ]
}
-------------------------
*Backend-
npm i 
nodemon server.js
--------------------------
*Frontend-
npm i
npx expo start

http://10.0.2.2:5000/api/auth/
------------------------









