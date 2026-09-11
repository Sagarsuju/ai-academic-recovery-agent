# AI Academic Recovery & Course Progress Agent

[![CI/CD Pipeline](https://github.com/vignan/ai-academic-recovery-agent/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/vignan/ai-academic-recovery-agent/actions/workflows/ci-cd.yml)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![ChromaDB](https://img.shields.io/badge/VectorDB-Chroma-FF6600)](https://www.trychroma.com)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com)

An enterprise-grade, intelligent academic monitoring, course progress tracking, risk prediction, and automated recovery planning system tailored for universities and educational institutions.

---

## System Architecture

```
                                    +------------------------------+
                                    |    Next.js 14 Frontend UI    |
                                    |  (Standalone Docker / Vercel)|
                                    +--------------+---------------+
                                                   | HTTP / WS
                                                   v
+---------------------------------------------------------------------------------------------------+
|                                  FastAPI Backend Core (Port 8000)                                 |
|                                (Multi-Stage Slim / Render / Railway)                              |
|                                                                                                   |
|  +-----------------------+  +------------------------+  +---------------------------------------+ |
|  |  Progress & Recovery  |  |   Risk Prediction ML   |  |   RAG Engine & LangChain Integration  | |
|  +-----------------------+  +------------------------+  +---------------------------------------+ |
+------------------+-----------------------+----------------------------------+---------------------+
                   |                       |                                  |
                   v                       v                                  v
+-----------------------------+ +---------------------+ +-------------------------------------------+
| PostgreSQL Primary Database | | ChromaDB Vector DB  | |        External Mock Microservices        |
|  (Port 5432 / Managed RDS)  | |  (Port 8000/8001)   | |  - Attendance System (Port 9001)          |
|                             | |                     | |  - Lesson Plan System (Port 9002)         |
+-----------------------------+ +---------------------+ +-------------------------------------------+
```

---

## Fresh-Clone Setup Steps

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` (LTS recommended)
- **Python**: `3.10` or `3.11`
- **Docker & Docker Compose**: v2.20+ (recommended for full-stack local execution)

---

### Option A: Quickstart with Docker Compose (Recommended)

Run all 6 interconnected services with a single command from repository root:

```bash
# 1. Clone repository
git clone https://github.com/vignan/ai-academic-recovery-agent.git
cd ai-academic-recovery-agent

# 2. Configure environment file
cp .env.example .env

# 3. Build and launch all containers
docker compose -f infra/docker-compose.yml up --build
```

**Services Running:**
- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend API**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Mock Attendance Microservice**: [http://localhost:9001/health](http://localhost:9001/health)
- **Mock Lesson Plan Microservice**: [http://localhost:9002/health](http://localhost:9002/health)
- **ChromaDB Vector Store**: [http://localhost:8001](http://localhost:8001)
- **PostgreSQL Database**: `localhost:5432`

---

### Option B: Local Native Development Setup

#### 1. Setup Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Start FastAPI application
python -m uvicorn main:app --reload --port 8000
```

#### 2. Run Mock Microservices (in separate terminals)
```bash
# Terminal A - Attendance Service (Port 9001)
python -m uvicorn mock_services.mock_attendance_system:app --port 9001 --reload

# Terminal B - Lesson Plan Service (Port 9002)
python -m uvicorn mock_services.mock_lesson_plan_system:app --port 9002 --reload
```

#### 3. Setup Frontend
```bash
cd ../frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Access the application at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables Matrix

All configuration parameters can be set in `.env` or in your production host environment settings.

| Variable | Default Value | Required in Prod | Description |
| :--- | :--- | :---: | :--- |
| `PORT` | `8000` | No | Internal port for the backend web server. |
| `HOST` | `0.0.0.0` | No | Bind host address. |
| `ENVIRONMENT` | `development` | Yes | Application environment (`development`, `production`, `testing`). |
| `DATABASE_URL` | `sqlite:///./academic_recovery.db` | **Yes** | Primary DB URL. Supports PostgreSQL (`postgresql://user:pass@host:5432/db`). Auto-normalizes legacy `postgres://` URLs on Render & Railway. |
| `POSTGRES_USER` | `postgres` | No | Default PostgreSQL username used in Docker Compose. |
| `POSTGRES_PASSWORD`| `postgres` | No | Default PostgreSQL password used in Docker Compose. |
| `POSTGRES_DB` | `academic_recovery` | No | PostgreSQL database name used in Docker Compose. |
| `CHROMA_PATH` | `/app/chroma_data` | **Yes** (if persistent disk) | File path on disk for ChromaDB vector embeddings. |
| `CHROMA_DB_URL` | `http://localhost:8000` | No | URL to standalone ChromaDB server container. |
| `JWT_SECRET` | `supersecretjwtkey_...` | **Yes** | Cryptographic secret key used to sign and verify JSON Web Tokens. |
| `SMTP_SERVER` | *(empty)* | No | SMTP host (e.g., `smtp.gmail.com` or `smtp.sendgrid.net`). If empty, alerts are safely logged. |
| `SMTP_PORT` | `587` | No | SMTP port (typically `587` for TLS or `465` for SSL). |
| `SMTP_USER` | *(empty)* | No | Authenticated SMTP username or email. |
| `SMTP_PASSWORD` | *(empty)* | No | Authenticated SMTP password or app-specific password. |
| `ATTENDANCE_SYSTEM_URL`| `http://localhost:9001` | No | URL endpoint of external university attendance system / mock service. |
| `LESSON_PLAN_SYSTEM_URL`| `http://localhost:9002`| No | URL endpoint of external university lesson plan system / mock service. |
| `OPENAI_API_KEY`| `mock_openai_api_key`| No | OpenAI API key for LLM recovery generation (or uses internal reasoning engine). |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | **Yes** | Public backend API URL consumed by the client-side Next.js browser app. |

---

## Production Deployment Instructions

### 1. Frontend Deployment on Vercel

Vercel is the optimal zero-configuration hosting platform for Next.js applications:

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com) $\rightarrow$ Click **"Add New Project"** $\rightarrow$ Select `ai-academic-recovery-agent`.
2. **Project Settings**:
   - **Root Directory**: Click **Edit** and choose `frontend`.
   - **Framework Preset**: Auto-detected as **Next.js**.
   - **Build Command**: `next build` (or leave default).
   - **Output Directory**: `.next` (or leave default).
3. **Configure Environment Variables**:
   - Add `NEXT_PUBLIC_API_URL`: Your deployed production backend URL (e.g., `https://api.youruniversity.edu` or `https://academic-recovery-backend.onrender.com`).
4. **Deploy**:
   - Click **"Deploy"**. Vercel will build the frontend and provision globally distributed edge CDN URLs.
5. **CI/CD Integration**:
   - In Vercel Project Settings $\rightarrow$ **Git** $\rightarrow$ **Deploy Hooks**, create a hook named `github-actions-cd`.
   - Add the resulting URL to your GitHub repo secrets as `VERCEL_DEPLOY_HOOK_URL`.

---

### 2. Backend Deployment on Render

Render offers managed PostgreSQL databases, Docker container runtime, and persistent disks:

#### Step A: Create Managed PostgreSQL
1. On [Render Dashboard](https://render.com), click **"New +"** $\rightarrow$ **"PostgreSQL"**.
2. Name the database `academic-recovery-db` and select your preferred region.
3. Once provisioned, copy the **Internal Database URL** (for services within the same region) or **External Database URL**.

#### Step B: Create Web Service
1. Click **"New +"** $\rightarrow$ **"Web Service"**.
2. Connect the `ai-academic-recovery-agent` repository.
3. In service settings:
   - **Root Directory**: `backend`
   - **Runtime**: **Docker** (Render will automatically detect and build `backend/Dockerfile` using our multi-stage slim python configuration).
   - **Instance Type**: Starter or Standard.
4. **Attach Persistent Disk (for ChromaDB)**:
   - Go to the **Disks** tab in your Render Web Service.
   - Click **"Add Disk"**:
     - Name: `chroma-storage`
     - Mount Path: `/app/chroma_data`
     - Size: `5 GB`
5. **Add Environment Variables**:
   - `ENVIRONMENT`: `production`
   - `DATABASE_URL`: *(Paste your Render PostgreSQL connection string)*
   - `CHROMA_PATH`: `/app/chroma_data`
   - `JWT_SECRET`: Generate a 64-char random hex string (`openssl rand -hex 32`)
   - `SMTP_SERVER`: `smtp.gmail.com` (or your university mail host)
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `alerts@vignan.ac.in`
   - `SMTP_PASSWORD`: `your_app_password`
   - `OPENAI_API_KEY`: *(Optional) Your OpenAI key*
6. **Health Check Path**:
   - Set to `/` (returns `{ "status": "operational" }`).
7. **Copy Webhook URL**:
   - In Render Web Service settings $\rightarrow$ **Deploy Hook**, copy the URL.
   - Store as `RENDER_DEPLOY_HOOK_URL` in GitHub Actions secrets.

---

### 3. Backend Deployment on Railway

Railway provides rapid container deployment with zero-configuration PostgreSQL plugins:

1. Create a new project on [Railway](https://railway.app).
2. Click **"Add a Service"** $\rightarrow$ **"Database"** $\rightarrow$ **"Add PostgreSQL"**.
3. Click **"Add a Service"** $\rightarrow$ **"GitHub Repo"** $\rightarrow$ select `ai-academic-recovery-agent`.
4. In the Service settings:
   - **Root Directory**: `/backend`
   - Railway auto-detects `Dockerfile` in `/backend`.
5. Under **Variables**:
   - Link Railway database: `DATABASE_URL = ${{Postgres.DATABASE_URL}}`
   - `CHROMA_PATH = /app/chroma_data`
   - `JWT_SECRET = <generate-secure-jwt-secret>`
   - `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
6. Under **Networking**:
   - Click **"Generate Domain"** to assign a public HTTPS domain.
7. Under **Volume**:
   - Add volume mounted at `/app/chroma_data` for vector database persistence.

---

## GitHub Actions CI/CD Pipeline

The `.github/workflows/ci-cd.yml` workflow automatically enforces quality gates on pull requests and automates production deployment on merge:

```
[ Pull Request to main ]
          |
          +---> 1. backend-test  : Python 3.11, Install requirements, Run Pytest suite
          +---> 2. frontend-check: Node 20, npm ci, Run ESLint & TypeScript Type Check

[ Merge to main ]
          |
          v
       3. deploy (Render / Railway backend + Vercel frontend via secure webhooks)
```

### Required GitHub Secrets for CD
To enable automated deployments, configure the following secrets under **Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions**:

| Secret Name | Destination | Description |
| :--- | :--- | :--- |
| `RENDER_DEPLOY_HOOK_URL` | Render Backend | Render Deploy Hook URL to trigger backend redeploys. |
| `RAILWAY_TOKEN` | Railway Backend | *(Optional)* Railway API token if deploying to Railway via CLI. |
| `VERCEL_DEPLOY_HOOK_URL` | Vercel Frontend | Vercel Deploy Hook URL to trigger instant production builds. |

---

## Docker Compose Infrastructure (`infra/docker-compose.yml`)

The production Docker Compose stack manages 6 dedicated containers:

| Container Name | Service | Base Image / Dockerfile | Exposed Port | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `academic_recovery_backend` | FastAPI Core | `backend/Dockerfile` (Slim 3.11) | `8000` | Main REST & WebSocket API |
| `academic_recovery_frontend` | Next.js 14 | `frontend/Dockerfile` (Standalone) | `3000` | UI Dashboard & Visualization |
| `academic_recovery_db` | PostgreSQL | `postgres:15-alpine` | `5432` | Relational Data Store |
| `academic_recovery_chroma` | ChromaDB | `chromadb/chroma:latest` | `8001` (Host) | Vector Store for Knowledge Base |
| `academic_recovery_mock_attendance` | Mock Attendance | `backend/Dockerfile.mock` | `9001` | External Biometric Attendance API |
| `academic_recovery_mock_lesson_plan` | Mock Lesson Plan | `backend/Dockerfile.mock` | `9002` | External Syllabus / ERP API |

All services communicate through the isolated `academic_recovery_network` bridge with container-level healthchecks and auto-recovery.

---

## Testing & Quality Assurance

```bash
# Run backend test suite
pytest tests -v

# Run frontend lint check
cd frontend && npm run lint

# Run frontend TypeScript type verification
cd frontend && npm run type-check
```

---

## License

Vignan's Foundation for Science, Technology & Research (Deemed to be University). Academic & Institutional Use Only.
