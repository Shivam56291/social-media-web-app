# 🚀 Active API Endpoints

This document provides a comprehensive overview of the active API endpoints available in the application[cite: 1]. All API endpoints are prefixed with `/api/`[cite: 1].

---

## 🔐 User & Authentication
**Base URL:** `/api/users/`[cite: 1]

> [!IMPORTANT]
> To allow the frontend to communicate with these endpoints, ensure your **Backend Configuration (Django)** includes the necessary CORS headers[cite: 1].

### 🛠️ Account Actions
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `register/` | **POST** | Create a new user account[cite: 1]. |
| `login/` | **POST** | Authenticate user and return access tokens[cite: 1]. |
| `logout-all/` | **POST** | Invalidate all active sessions across devices[cite: 1]. |

### 👤 Profile Management
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `me/` | **GET** | Fetch details of the currently authenticated user[cite: 1]. |
| `me/update/` | **PUT/PATCH** | Update the profile information for the current user[cite: 1]. |
| `update-email/` | **POST** | Change the email address associated with the account[cite: 1]. |
| `change-password/` | **POST** | Update the account password[cite: 1]. |
| `privacy/` | **PUT/PATCH** | Update user privacy settings and visibility[cite: 1]. |
| `deactivate/` | **POST** | Deactivate the user's account[cite: 1]. |

---

## 📋 Base Endpoints
**Base URL:** `/api/base/`[cite: 1]

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | **GET** | General entry point for the base API module[cite: 1]. |

---

## 🌐 Global Routes
These endpoints are handled directly in the root `urlpatterns`[cite: 1].

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/` | **GET** | Main application landing page[cite: 1]. |
| `admin/` | **N/A** | Django Administration interface[cite: 1]. |