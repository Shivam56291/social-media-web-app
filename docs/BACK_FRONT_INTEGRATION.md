# 🔗 Linking Backend & Frontend

This section covers how to establish the connection between the Django API and the React Frontend.

---

## 🐍 Backend Configuration (Django)

To allow the React app to communicate with Django, we use CORS (Cross-Origin Resource Sharing).

### 1. Install CORS Headers
Inside the `backend/` directory (with virtual env active):
```bash
uv add django-cors-headers --active
```

### 2. Update settings.py
Add the following configurations:
```python
INSTALLED_APPS = [ ..., "corsheaders", ]

MIDDLEWARE = [ 
    "corsheaders.middleware.CorsMiddleware", # Must be at the top 
    "django.middleware.common.CommonMiddleware", 
    ..., 
]

CORS_ALLOWED_ORIGINS = [ 
    "http://localhost:5173", 
    "[http://127.0.0.1:5173](http://127.0.0.1:5173)", 
]
```

---

## ⚛️ Frontend Configuration (React)

### 1. Install Necessary Dependencies
Inside the frontend/ directory, run:
```bash
npm install react-router-dom react-redux @reduxjs/toolkit
```

We use Axios to handle API requests efficiently.

### 2. Install Axios
Inside the frontend/ directory:
```bash
npm install axios
```

### 3. Testing the Connection
To verify the link, ensure the backend is running on port 8000 and the frontend is on 5173. Use the following pattern in your React components:

```javascript
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('[http://127.0.0.1:8000/api/test/](http://127.0.0.1:8000/api/test/)');
    console.log(response.data);
  } catch (error) {
    console.error("Connection failed:", error);
  }
};
```

## ⚠️ Troubleshooting

* **CORS Error**: Ensure `CorsMiddleware` is placed **BEFORE** `CommonMiddleware` in the `MIDDLEWARE` list within Django settings.
* **Network Error**: Verify that the Django server is actually running. (Command: `uv run python manage.py runserver`).
* **Port Mismatch**: If Vite runs on a port other than `5173`, you must update the `CORS_ALLOWED_ORIGINS` list in your Django `settings.py` to match.
