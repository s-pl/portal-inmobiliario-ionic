# Idealistia: Real Estate Portal

A full-stack, beginner-friendly real estate platform built with Ionic Angular (frontend), Node.js/Express (backend), MySQL (database), and optional Google Gemini AI integration for property description generation. The project is fully dockerized for easy local development and deployment.

---

## Features

### Frontend (Ionic + Angular)
- Responsive, mobile-first UI with a clean, modern design
- Property listing with search and filtering
- Add, edit, and delete properties (CRUD)
- Simple property form with validation
- Upload a main image via URL
- Generate property descriptions with AI (Google Gemini, optional)
- Spanish language UX/UI
- Dockerized build served via Nginx

### Backend (Node.js + Express + Sequelize)
- RESTful API for property CRUD operations
- MySQL database integration
- Sequelize ORM with auto-migration
- CORS support for local/dev/prod frontends
- AI description endpoint using Google Gemini (if API key provided)
- Dockerized for production or local use

### Database (MySQL)
- Stores all property data
- Auto-created tables on first run
- Data persisted in Docker volume

### DevOps
- Docker Compose for orchestrating frontend, backend, and database
- Environment variable support via `.env` file
- Example `.env.example` provided
- Ready for deployment to any Docker-compatible host

---

## Quick Start

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed
- (Optional) [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for local development

### 1. Clone the repository
```bash
# Clone this repo
https://github.com/s-pl/portal-inmobiliario-ionic.git
cd portal-inmobiliario-ionic
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and edit as needed:
```bash
cp .env.example .env
# Edit DB credentials, Gemini API key, etc.
```

### 3. Build and run with Docker Compose
```bash
docker compose up --build
```
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:3000](http://localhost:3000)
- MySQL: localhost:3307 (default, see `docker-compose.yml`)

### 4. (Optional) Local development
You can run frontend and backend separately with live reload:
- Backend:
  ```bash
  cd backend
  npm install
  npm run dev
  ```
- Frontend:
  ```bash
  cd frontend
  npm install
  npm run start
  # or: ionic serve
  ```

---

## Project Structure

```
idealistia/
├── backend/         # Node.js Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── Dockerfile
│   └── ...
├── frontend/        # Ionic Angular app
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ...
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## AI Description Generation (Optional)
- To enable AI-powered property descriptions, get a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
- Add your key to the `.env` file as `GEMINI_API_KEY`.
- If no key is provided, the backend will return a simple fallback description and will not crash.

---

## Environment Variables
See `.env.example` for all options:
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_ROOT_PASSWORD`
- `PORT` (backend)
- `GEMINI_API_KEY` (optional)

---

## Deployment
- Build and push Docker images to your registry (e.g., Docker Hub)
- Update `docker-compose.yml` to use your image tags
- Deploy on any server with Docker Compose

---

## License
MIT

---

## Authors
- [s-pl](https://github.com/s-pl) and contributors

---

## Screenshots

![Property List](docs/screenshots/property-list.png)
![Property Form](docs/screenshots/property-form.png)

---

## Troubleshooting
- If MySQL port 3306 is in use, the compose file maps to 3307 by default.
- If you see AI errors, check your `GEMINI_API_KEY` or leave it blank for fallback.
- For any issues, open an issue on GitHub.
