
# 📄 README Auto Generator

> An AI-powered web application that eliminates one of the most tedious tasks in software development — writing documentation.

A developer pastes a GitHub repository URL (or uploads a ZIP), and within seconds receives a fully structured, professional `README.md` inferred directly from source code, dependency manifests, folder layout, and existing comments.


---

## ✨ Features

- 🔗 **GitHub URL Input** — Paste any public GitHub repo URL to auto-generate its README
- 📦 **ZIP Upload** — Upload a zipped project folder for offline or private repos
- 🤖 **AI-Powered Generation** — Uses Gemini or Claude (Anthropic) to intelligently infer documentation
- 🔐 **GitHub OAuth** — Secure login via GitHub for a personalized experience
- 💾 **History Persistence** — Generated READMEs are saved per user in a PostgreSQL database
- 📋 **Copy & Download** — Instantly copy or download the generated `README.md`
- 🐳 **Dockerized** — Full-stack Docker Compose setup for easy local development

---

## 🏗️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React (Vite), HTML, CSS             |
| Backend   | Node.js, Express                    |
| Database  | PostgreSQL + Sequelize ORM          |
| AI        | Google Gemini API / Anthropic Claude API |
| Auth      | GitHub OAuth + JWT                  |
| DevOps    | Docker, Docker Compose, Vercel      |

---

## 📁 Project Structure

```
README-auto-generator/
├── client/                  # React frontend (Vite)
├── server/                  # Node.js + Express backend
├── docker-compose.yml       # Multi-service Docker setup
├── .env.example             # Environment variable template
└── package.json             # Root-level dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) & Docker Compose
- A [Gemini API Key](https://aistudio.google.com/) or [Anthropic API Key](https://console.anthropic.com/)
- A [GitHub OAuth App](https://github.com/settings/developers)

---

### Option 1: Run with Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/OmmPrakash-tech/README-auto-generator.git
   cd README-auto-generator
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in the values in `.env` (see [Environment Variables](#-environment-variables)).

3. **Start all services**

   ```bash
   docker compose up --build
   ```

4. **Access the app**

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:4000](http://localhost:4000)

---

### Option 2: Run Locally (Manual)

1. **Install server dependencies**

   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Ensure PostgreSQL is running locally with the credentials matching your `.env`.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in the following:

```env
# AI API (choose one)
GEMINI_API_KEY=
ANTHROPIC_API_KEY=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# JWT Authentication
JWT_SECRET=

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=readme_generator

# Server
PORT=4000

# Frontend
CLIENT_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

---

## 🐳 Docker Services

The `docker-compose.yml` spins up three services:

| Service    | Container           | Port   | Description              |
|------------|---------------------|--------|--------------------------|
| `client`   | `readme-client`     | 5173   | React frontend (Vite)    |
| `server`   | `readme-server`     | 4000   | Express API backend      |
| `postgres` | `readme-postgres`   | 5432   | PostgreSQL 16 database   |

---

## 📸 How It Works

1. **Login** with your GitHub account via OAuth
2. **Paste** a GitHub repo URL or **upload** a ZIP of your project
3. The server **fetches and parses** the repository — reading source files, dependency manifests, folder structure, and code comments
4. The parsed context is sent to the **AI model** (Gemini or Claude) with a structured prompt
5. A complete, professional **README.md is generated** and displayed in the browser
6. **Copy or download** the result with one click

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Omm Prakash**
- GitHub: [@OmmPrakash-tech](https://github.com/OmmPrakash-tech)

---

## 📄 License

This project is open source. Feel free to use it, modify it, and contribute back!
