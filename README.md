# ⚡ TaskMaster Pro - Full-Stack Task Manager

A production-ready full-stack Task Manager application built with **React.js** frontend, **FastAPI** backend, and **PostgreSQL** database, featuring containerization via **Docker & Docker Compose**.

![Task Manager Architecture](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20PostgreSQL-indigo)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 📝 **Full CRUD Operations**: Create, read, edit, toggle completion, and delete tasks.
- 🎯 **Priority & Due Dates**: Assign priorities (`low`, `medium`, `high`) and target completion dates.
- 🔍 **Real-time Search & Filtering**: Instant search by keywords, status (`all`, `active`, `completed`), priority filters, and sorting options.
- 📊 **Dashboard Stats**: Real-time metrics overview (total tasks, completion rate, pending tasks, high priority items).
- 🎨 **Modern Sleek UI**: Responsive glassmorphism interface built with Vanilla CSS, dark mode backdrop, and fluid micro-animations.
- 🐋 **Docker Ready**: Multi-container setup orchestrating PostgreSQL, FastAPI, and Nginx-hosted React.
- ⚙️ **Configurable**: Environment-variable driven configuration (`.env`).

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS, Lucide Icons, Axios | Responsive single-page app with glassmorphism UI |
| **Backend** | FastAPI, Python 3.11, Pydantic v2, Uvicorn | RESTful API with validation and automatic Swagger docs |
| **Database** | PostgreSQL, SQLAlchemy | Relational database with automatic table creation & SQLite fallback |
| **Containerization** | Docker, Docker Compose, Nginx | Production multi-stage builds and container orchestration |

---

## 📁 Project Structure

```
web/
├── backend/                  # FastAPI Python Application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py         # Environment settings via Pydantic
│   │   ├── database.py       # SQLAlchemy engine & session setup
│   │   ├── models.py         # SQLAlchemy Task database model
│   │   ├── schemas.py        # Pydantic v2 data schemas
│   │   ├── crud.py           # Database query functions
│   │   └── main.py           # FastAPI endpoints & CORS
│   ├── .env.example          # Backend env variable template
│   ├── Dockerfile            # Python backend container build
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React Vite Application
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js    # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatsOverview.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── App.jsx           # Main React state container
│   │   ├── index.css         # CSS design system & utility classes
│   │   └── main.jsx          # React entry point
│   ├── Dockerfile            # Multi-stage React + Nginx build
│   ├── nginx.conf            # Production Nginx reverse proxy
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml        # Orchestrates PostgreSQL + FastAPI + React
├── .env.example              # Root environment template
└── README.md                 # Setup & deployment guide
```

---

## 🚀 Quick Start with Docker (Recommended)

Run the entire full-stack application (PostgreSQL + FastAPI + React Frontend) with a single command:

```bash
# 1. Clone or navigate to directory
cd web

# 2. Build and start all services
docker compose up --build
```

Access the application in your browser:
- 🌐 **Frontend UI**: [http://localhost](http://localhost)
- ⚡ **FastAPI REST API**: [http://localhost:8000](http://localhost:8000)
- 📖 **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

To stop the containers:
```bash
docker compose down
```

---

## 💻 Local Development Setup (Without Docker)

### 1. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Run FastAPI dev server (defaults to SQLite if PostgreSQL isn't running)
uvicorn app.main:app --reload --port 8000
```

FastAPI server runs at `http://localhost:8000`.

### 2. Frontend Setup (React)

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install node packages
npm install

# Start Vite dev server
npm run dev
```

React app runs at `http://localhost:5173`.

---

## 🔗 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check endpoint |
| `GET` | `/api/tasks` | Get all tasks (supports `search`, `status`, `priority`, `sort_by`) |
| `GET` | `/api/tasks/stats` | Get metrics summary (total, completed, pending, high priority) |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/{id}` | Get details of a task by ID |
| `PUT` | `/api/tasks/{id}` | Update existing task details |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle completion status |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

---

## 🌐 Production Hosting & Deployment Practice Guide

This project is designed for practicing modern cloud hosting and deployment options:

### Option A: Render (Free Tier Friendly)
1. **Database**: Create a Managed PostgreSQL Instance on Render. Copy the Internal Database URL.
2. **Backend**:
   - Create a Web Service connected to your repo.
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variable `DATABASE_URL` with your Render Postgres URL.
3. **Frontend**:
   - Create a Static Site on Render.
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variable: `VITE_API_BASE_URL` pointing to your deployed backend service URL.

### Option B: Railway / Fly.io (Container Deployment)
- Deploy using the provided `Dockerfile` files in `backend/` and `frontend/`.
- Railway automatically detects `docker-compose.yml` or individual Dockerfiles.

### Option C: Single VPS Deployment (DigitalOcean / AWS EC2 / Hetzner)
- Install Docker & Docker Compose on your server.
- Clone the repository and run:
  ```bash
  docker compose -f docker-compose.yml up -d --build
  ```
- Set up SSL certificates with Certbot/Let's Encrypt for custom domains.

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
