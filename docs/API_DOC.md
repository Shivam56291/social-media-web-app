# 🚀 Active API Endpoints

This document provides a comprehensive overview of the active API endpoints available in the application[cite: 1]. All API endpoints are prefixed with `/api/`[cite: 1].

---

> [!NOTE]
> All endpoints below (except where noted) require a valid JWT `Bearer <token>` in the `Authorization` header.

---

## 🔐 User & Authentication
**Base URL:** `/api/users/`[cite: 1]

> [!IMPORTANT]
> To allow the frontend to communicate with these endpoints, ensure your **Backend Configuration (Django)** includes the necessary CORS headers.

## 🔍 User Discovery
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `all-users/` | **GET** | Fetch a directory list of all registered users on the platform. |
| `get-user/<int:id>/` | **GET** | Retrieve public profile details for a specific user by their ID. |


### 🛠️ Account Actions
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `register/` | **POST** | Create a new user account. |
| `login/` | **POST** | Authenticate user and return access tokens. |
| `logout-all/` | **POST** | Invalidate all active sessions across devices. |
| `token/refresh/` | **POST** | Refresh the JWT access token using a refresh token (Note: Your Django file has duplicate routes here, with CookieTokenRefreshView taking precedence).. |

### 👤 Profile Management
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `me/` | **GET** | Fetch details of the currently authenticated user. |
| `me/update/` | **PUT/PATCH** | Update the profile information for the current user. |
| `me/posts/` | **GET** | Retrieve all posts authored by the currently authenticated user.. |
| `update-email/` | **POST** | Change the email address associated with the account. |
| `change-password/` | **POST** | Update the account password. |
| `privacy/` | **PUT/PATCH** | Update user privacy settings and visibility. |
| `deactivate/` | **POST** | Deactivate the user's account. |

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
| `/` | **GET** | Main application landing page. |
| `admin/` | **N/A** | Django Administration interface. |

---

## 📝 Posts & Engagement
**Base URL:** `/api/posts/`

### 🗂️ Core Post Actions
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `create/` | **POST** | Create a new post. Accepts a `content` string and an `image_urls` array of strings. |
| `feed/` | **GET** | Fetch a global timeline of all recent posts, including dynamic counts for likes and comments. |
| `user/<int:user_id>/` | **GET** | Retrieve all posts authored by a specific user profile ID. |
| `<int:id>/` | **GET** | Retrieve comprehensive data for a single post by its ID. |
| `<int:id>/` | **PUT/PATCH** | Update the content or media of an existing post (Author only). |
| `<int:id>/` | **DELETE** | Permanently delete a post from the platform (Author only). |

### 💬 Interactions & Socials
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `<int:id>/like/` | **POST** | Dynamic toggle view. Hits once to add a like; hits again to unlike. Returns updated count and current status. |
| `<int:post_id>/comments/` | **GET** | Fetch all comments associated with a specific post, ordered chronologically. |
| `<int:post_id>/comments/` | **POST** | Publish a text comment on a specific post. |

### 🔹 Comment Management
**Base URL:** `/api/posts/comments/`
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `<int:id>/` | **PATCH** | Partially update the text content of an existing comment (Author only). |
| `<int:id>/` | **DELETE** | Permanently remove a comment from the post (Author or Post Owner only). |

---