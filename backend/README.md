# 🚀 Backend Setup (Django + uv)

This guide helps you set up the backend locally after cloning the repository.

---

## 📁 Navigate to backend

```bash
cd social_media_website/backend
```

---

## ⚙️ Prerequisites

- Python 3.11 or 3.12 installed
- uv installed

Install uv (if not installed):
```bash
pip install uv
```

---

## 🛠️ Setup Steps

### 1. Create virtual environment
```bash
uv venv
```

---

### 2. Activate virtual environment (IMPORTANT)

#### Windows (PowerShell):
```bash
.venv\Scripts\activate
```

#### Linux / Mac:
```bash
source .venv/bin/activate
```

👉 After activation, you should see:
```
(.venv)
```

⚠️ Always activate the environment before starting work.

---

### 3. Install dependencies
```bash
uv sync
```

---

### 4. Setup environment variables

Create a `.env` file inside `backend/`:

```bash
touch .env
```

👉 Keep it empty for now.

⚠️ Important:
- Add variables here only when required (e.g., SECRET_KEY, DB config)
- Never push `.env` to Git

---

### 5. Apply migrations
```bash
uv run python manage.py migrate
```

---

### 6. Run development server
```bash
uv run python manage.py runserver
```

Open in browser:
```
http://127.0.0.1:8000/
```

---

## 🔁 Daily Workflow

Every time you start working:

```bash
cd backend
.venv\Scripts\activate   # (or source for Linux/Mac)
uv run python manage.py runserver
```

---

## 🔧 Common Commands

Create new app:
```bash
uv run python manage.py startapp <app_name>
```

Migrations:
```bash
uv run python manage.py makemigrations
uv run python manage.py migrate
```

Add dependency:
```bash
uv add <package-name>
```

---

## ⚠️ Important Notes

- Do NOT commit `.venv/`
- Do NOT commit `.env`
- Do NOT commit `db.sqlite3`
- Always use `uv` (not pip)
- Always activate `.venv` before working
- Always run Django commands using `uv run`

---

## ✅ Quick Start

```bash
cd backend
uv venv
.venv\Scripts\activate
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

---

Now your backend should run the same as other teammates.