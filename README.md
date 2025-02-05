# **Real-Time Chat App**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A full-stack **MERN** (MongoDB, Express, React, Node.js) real-time chat application with user authentication, chat rooms, and message reactions. Built with **TypeScript**, **Socket\.io**, and a modern, responsive **Tailwind CSS** UI.

The app allows users to register, log in, and join chat rooms to send messages, images, and reactions in real-time. The backend serves the React frontend as a static folder and manages authentication with **HTTP-only cookies and JWT tokens** for enhanced security.

## Railway Deployment (Current Live Version)

The chat app is live! Click below to try it out:

[![Live on Railway](https://img.shields.io/badge/Live%20Demo-%F0%9F%9A%80-blue?style=for-the-badge)](https://react-chat-app-production-a349.up.railway.app/)

🔗 **URL:** [https://react-chat-app-production-a349.up.railway.app/](https://react-chat-app-production-a349.up.railway.app/)

## **Screenshots**

### **Home Page**

![Home Page](https://drive.google.com/uc?id=1lE5_P67S8AN9lwXchznTtmaRWz5h9BqQ)

### **Chat Room**

##### PC view:

![Chat Room PC](https://drive.google.com/uc?id=1OZpX8mpGguhhTckLFh6OpWIVgEdiBPwO)

##### Mobile view:

![Chat Room Mobile](https://drive.google.com/uc?id=17TVHD3Ryv4hnF4yz5a1YBWpTjt7r4k3y)

### **User Profile**

#### Light mode:

![User Profile](https://drive.google.com/uc?id=1aDScwxql0LxfSAjPeB1I8YUdDarA4qcN)

### **Register**

#### Mobile view:

![Register Mobile](https://drive.google.com/uc?id=1ms-OovuaFFXGnwOCBZhsPNUHyvpHIHUz)

## **Features**

- [x] **Chat Rooms** – Join public chat rooms and interact with multiple users.
- [x] **User Presence** – See who is currently in room and who is typing messages and receive announcements when users join or leave.
- [x] **Authentication** – Secure registration and login with JWT-based authentication.
- [x] **Message Reactions** – React to messages with emojis and see others' reactions.
- [x] **Message Replies** – Reply to messages and view conversation threads.
- [x] **Media Support** – Send and preview images directly in the chat.
- [x] **Profile Management** – Update profile info, change passwords, or delete your account.
- [x] **Multi-Device Support** – Join and chat from multiple devices.
- [x] **Scroll to Bottom Button** – Quickly navigate to the latest messages.
- [x] **Dark/Light Mode Toggle** – Switch between dark, light, or system theme preferences for a personalized user experience.

## Future Enhancements

Planned features for upcoming versions of the **MERN Chat App**:

- [ ] **@Mentions in Chat** – Allow users to mention others in messages.
- [ ] **Voice Messages** – Implement audio message support using the **MediaStream Recording API**.
- [ ] **Recent Rooms Section** – Display the most recently joined rooms on the chat join page for quick access.
- [ ] **Password Reset via Email** – Add a "Forgot Password" feature that sends a password reset link via email.
- [ ] **Message Actions**
  - **Reactions Menu** – Tap & hold a message to react with emojis.
  - **Copy Message** – Enable a pop-up dialog to copy messages on long press.

## **Tech Stack**

### **1. Frontend**

- **React 18** – UI framework
- **Tailwind CSS** – Modern responsive styling
- **Vite** – Fast build tool for development
- **React Router** – Client-side routing
- **Socket\.io Client** – Real-time communication
- **React-Toastify** – Notification system

### **2. Backend**

- **Node.js + Express** – Server-side framework
- **JWT + HTTP-only Cookies** – Secure authentication
- **Mongoose** – MongoDB ORM for database management
- **Socket\.io** – Real-time messaging
- **bcrypt.js** – Secure password hashing
- **TypeScript** – Strongly typed backend development

### **3. Database & Schema**

The application uses **MongoDB** with **Mongoose** to store user data. The schema for users is defined to manage registration, authentication, and profile management. Below is a breakdown of how the schema works:

#### **User Schema Overview**

- **`name`** (`string`, required, unique) – Stores the user’s display name. Must be unique across all users.
- **`email`** (`string`, required, unique) – Used for authentication and serves as a unique identifier.
- **`password`** (`string`, required) – Stores the hashed password for authentication.
- **`avatar`** (`number`, optional) – Represents an avatar index, allowing users to select an avatar.
- **Timestamps** (`createdAt`, `updatedAt`) – Automatically added to track when the user document is created or updated.

#### **Password Handling**

- The schema includes a **pre-save hook** that hashes the password using **bcrypt.js** before storing it in the database.
- The **`matchPassword`** method allows comparing the entered password with the stored hashed password when users log in.

#### **Message Handling in the Chat Rooms**

Messages are **not stored in the database** to avoid conflicts in public chat rooms, where chat rooms are not unique and are not managed by an admin.

Instead, messages are stored in the **client's session storage**, ensuring:

- Each user maintains a **local chat history** without adding unnecessary data to the database.
- Real-time communication is handled via **Socket\.io**, synchronizing messages across connected users.
- Messages persist **only for the current session**, keeping the chat lightweight and preventing database overload.

This design optimizes performance while ensuring seamless real-time interactions.

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/Ziad-Elshrief/MERN-Chat-App.git
cd MERN-Chat-App
```

### **2. Set up the Backend**

```sh
cd Real-Time-Chat-Server
npm install
npm run build
npm start
```

- Create a `.env` file and configure your MongoDB URI, JWT secrets, and other necessary environment variables.

### **3. Set up the Frontend**

```sh
cd ../Real-Time-Chat-Frontend
npm install
npm run dev
```

### Build & Start Commands for Deployment

#### **Build Command:**

```sh
cd Real-Time-Chat-Frontend && npm install && npm run build && cd .. && cd Real-Time-Chat-Server && npm install && npm run build
```

#### **Start Command:**

```sh
cd Real-Time-Chat-Server && node dist/server.js
```

## Backend API Endpoints Documentation

### Authentication Routes

- **POST `/api/auth/`**  
  Registers a new user.

  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "avatar": "number (optional)"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "avatar": "number"
    }
    ```

- **POST `/api/auth/login`**  
  Logs in a user and generates access & refresh tokens.

  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "avatar": "number"
    }
    ```

- **POST `/api/auth/logout`**  
  Logs out the user by clearing the authentication cookies.

  - **Response**:
    ```json
    {
      "message": "Logged out"
    }
    ```

- **POST `/api/auth/update-password`**  
  Updates the user’s password (authentication required).

  - **Request Body**:
    ```json
    {
      "currentPassword": "string",
      "newPassword": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "updated password"
    }
    ```

- **POST `/api/auth/delete-account`**  
  Deletes the user account (authentication required).
  - **Request Body**:
    ```json
    {
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Your account has been deleted"
    }
    ```

### User Profile Routes

- **GET `/api/auth/profile`**  
  Fetches the logged-in user's profile (authentication required).

  - **Response**:
    ```json
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "avatar": "number"
    }
    ```

- **PUT `/api/auth/profile`**  
  Updates the logged-in user's profile (authentication required).
  - **Request Body**:
    ```json
    {
      "name": "string (optional)",
      "email": "string (optional)",
      "avatar": "number (optional)"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "avatar": "number"
    }
    ```

### Token Refresh Route

- **POST `/api/auth/refresh-token`**  
  Refreshes the JWT access and refresh tokens.
  - **Response**:
    ```json
    {
      "message": "Refreshed token"
    }
    ```

### Middleware (`protect`)

The `protect` middleware is used to protect routes that require authentication. It checks for a valid JWT token in the request cookies and ensures that the user is authorized to access the requested resource. If the token is missing or invalid, it returns a 401 Unauthorized error.

### Example of a Protected Route

To use the `protect` middleware, you can do the following in your route definition:

```js
router.post("/update-password", protect, updateUserPassword);
```

## **Project Structure**

```sh
/MERN-Chat-App
├── /Real-Time-Chat-Frontend         # Frontend (Vite + React + Tailwind + TypeScript)
│   ├── /public/                     # Static files (favicons, images, etc.)
│   │   ├── /profile_pictures/
│   │   ├── /reacts/
│   │   └── home_bg.png
│   ├── /src/                        # Main source code
│   │   ├── /components/             # Reusable UI components
│   │   ├── /pages/                  # Application pages
│   │   ├── /context/                # Global state management (React Context API)
│   │   │   ├── MessageListContext.tsx
│   │   │   ├── SiteThemeContext.tsx
│   │   │   └── UserInfoContext.tsx
│   │   ├── /api/                    # Api Functions
│   │   │   └── userApi.ts           # API calls
│   │   ├── /api/                    # Utility functions/helpers
│   │   │   ├── profilepictures.ts   # To use through the app
│   │   │   └── reacts.ts            # To use in reacts menu
│   │   ├── App.tsx                  # Main App component
│   │   ├── main.tsx                 # Entry point for React
│   │   ├── index.css                # Global CSS (Tailwind included)
│   │   └── vite-env.d.ts            # TypeScript environment types
│   ├── .eslint.json                 # ESLint configuration
│   ├── index.html                   # Root HTML file
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.ts           # TailwindCSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── vite.config.ts               # Vite configuration
├── /Real-Time-Chat-Server           # Backend (Express & Socket.io)
│   ├── /models/                     # Mongoose models
│   │   └── userModel.ts             # User schema (with password hashing)
│   ├── /routes/                     # Express API routes
│   ├── /controllers/                # Business logic for routes
│   │   └── userController.ts        # Handles user actions
│   ├── /config/                     # Configurations (MongoDB)
│   │   └── db.ts                    # MongoDB connection
│   ├── /middleware/                 # Express middlewares
│   │   ├── authMiddleware.ts        # Middleware to check if the user is authenticated
│   │   └──  errorMiddleware.ts      # Middleware to put errors in json format
│   ├── /utils/                      # Helper functions (e.g., JWT validation)
│   │   ├── generateToken.ts         # JWT token generation and verificationmanagement
│   │   ├── messages.ts              # Formatting incoming messages and reacts
│   │   └── users.ts                 # Manipulating active users list
│   ├── /lib/                        # Essintial lib files (types)
│   ├── server.ts                    # Main server entry point (Express + Socket.io setup)
│   ├── .env                         # Environment variables (DB URI, JWT secret, etc.)
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript configuration for the server
│   └── tslint.json                  # TSLint configuration (if using TSLint)
├── .gitignore                       # Git ignore file
└── README.md                        # Project documentation
```

## Acknowledgements

This project was inspired by [Brad Traversy's Chat-Cord Tutorial](https://github.com/bradtraversy/chatcord) which demonstrated basic Socket\.io functionality with HTML, CSS, and JavaScript.