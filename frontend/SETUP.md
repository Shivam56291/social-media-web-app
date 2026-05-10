# ⚛️ Frontend - Social Media Web App

This is the React frontend for the Social Media Web App, built using **Vite** for a fast and modern development experience.

---

## 🛠️ Local Setup

### 1. Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** (comes with Node)

### 2. Installation
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a local .env file to handle backend API connections:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.


## 🚫 What NOT To Do

To keep the repository clean and avoid "config issues," please follow these rules:

* **Don't Commit `node_modules`**: This folder is large and environment-specific. It is already in `.gitignore`.
* **Don't Commit `.env`**: This file contains your local configurations. Only update `.env.example` if you add new environment variables.
* **Don't Use Other Package Managers**: Please stick to **npm** to keep our `package-lock.json` consistent. Do not use yarn or pnpm.
* **Don't Run Setup in Root**: Always ensure you are inside the `/frontend` folder before running npm commands.

---

## 📦 Available Scripts

- `npm run dev`: Start the dev server.
- `npm run build`: Build the app for production (outputs to `/dist`).
- `npm run preview`: Preview the production build locally.

---

### 💡 Why this works for your team:

* **The `.env.example` approach**: Prevents contributors from breaking the app because they "didn't know" they needed a specific API URL.
* **The "What NOT To Do" section**: Explicitly prevents the most common beginner mistakes (like pushing `node_modules`).
* **Consistency**: By insisting on `npm`, you ensure that the `package-lock.json` stays healthy and everyone has identical versions of React and other libraries.
