# MERN Backend Template

A production-ready **MERN backend template** built with **TypeScript**, designed to save development time with pre-configured setups and best practices.  
Just clone, configure, and start building scalable backend applications with ease.

---

## Features

- **Project Structure**

  - Modular folder structure (MVC pattern + feature-based modules)
  - Pre-configured `Auth` & `User` modules (controllers, services, routes, validations, interfaces, models)

- **Development Setup**

  - TypeScript configuration
  - ESLint + Prettier setup for clean & consistent code
  - Environment variables configuration

- **Database**

  - Mongoose setup with models & interfaces
  - Auto **Admin user creation** on first run

- **Core Utilities**

  - Global error handling middleware
  - Custom utility functions
  - Request validation with Zod/Yup (if using)
  - Redis setup for caching, sessions, or OTPs

- **Email & Authentication**

  - User authentication module
  - OTP verification via email
  - Secure password handling with hashing
  - JWT authentication (access/refresh tokens)

- **Ready-to-Extend**
  - Routes, middlewares, and service layers already set up
  - Easy to create new modules
  - Clone & rename for instant project setup

## Folder Structure

```

mern-backend-template/
├── app/
│   ├── config/         # Env, Redis configs
│   ├── errorHelpers/
│   ├── routes/
│   ├── interfaces/
│   ├── helpers/
│   ├── modules/
│   │   ├── auth/       # Auth controllers, routes, services, validation
│   │   ├── user/       # User controllers, routes, services, validation
│   ├── middlewares/    # Error handler, auth guard, etc.
│   ├── utils/          # Helper functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Entry point
├── .env.example        # Example env variables
├── tsconfig.json       # TypeScript config
├── .eslintrc.json      # ESLint rules
├── package.json
└── README.md

```

---

## Getting Started

### Clone the repository

```bash
https://github.com/devsafix/mern-backend-template
cd mern-backend-template
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Configure environment variables

Rename `.env.example` → `.env` and update values:

### Start the server

```bash
npm run dev
```

Your server will start on `http://localhost:5000`

---

## Scripts

```bash
npm run dev     # Start in development with ts-node-dev
npm run build   # Build TypeScript to JavaScript
npm start       # Run production build
npm lint        # Run ESLint checks
```

---

## Contributing

Contributions are welcome! Feel free to fork this repo, open issues, and submit PRs.

---

## Why use this template?

✅ Saves hours of project setup time
✅ Follows best practices (MVC, modular, clean code)
✅ Pre-built authentication & user management
✅ Easily extendable for any MERN project

---

## Author

**Kawser Ferdous Safi** – [devsafix.vercel.app](https://devsafix.vercel.app)
