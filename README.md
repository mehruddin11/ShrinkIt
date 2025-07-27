# 🔗 URL Shortener

A **production-grade**, **open-source** URL shortening service inspired by Bitly and TinyURL. Built using scalable **Spring Boot microservices** (Maven), **Angular 20**, **TailwindCSS**, **MongoDB**, and **MySQL** for an elegant full-stack experience.

![Architecture](docs/system-design.png)

---

## 🧠 How It Works

The system consists of three backend microservices that work in coordination to generate and manage short URLs efficiently:

### 🔹 1. User Service

* Accepts long URLs from users
* Interacts with **MongoDB** to store user data, long URLs, short URLs, and expiration dates
* Calls the `url-generator` service to get a fresh unused hash

### 🔹 2. URL Generator Service

* Interacts with **SQL (MySQL/PostgreSQL)** to store and fetch reusable hash keys
* On request, provides a unique hash where `used = false`
* Once returned, the user-service maps it with the user's long URL

### 🔹 3. Cleaner Service

* Periodically scans expired URLs
* Marks expired hash keys as `used = false` in the SQL DB so they can be reused

This model keeps hash generation deterministic, consistent, and scalable across millions of users.

---

## 🌟 Features

* 🔐 Unique & reusable hash key generation (SHA/MD5)
* 📦 URL/document store in MongoDB
* 🗃️ Hash metadata in SQL (MySQL/PostgreSQL)
* 🧹 Cleaner service to remove expired URLs and recycle hashes
* 🚀 Built with microservices: modular and scalable
* 🎨 Responsive frontend with Angular 20 + TailwindCSS
* ⚡ Redis-ready for caching (LRU-style)
* 🔍 Coming Soon: Analytics, QR code, custom aliases

---

## 🧱 Architecture Overview

### Microservices

* **User Service** – Handles long/short URL mapping, MongoDB persistence
* **URL Generator Service** – Generates and manages unique short hashes
* **Cleaner Service** – Cleans expired hashes and recycles them
* **API Gateway** – Routes and secures external traffic

### Data Stores

* **MongoDB** – Stores user-specific long URLs & metadata
* **MySQL/PostgreSQL** – Stores hash keys and status (`used: true | false`)

---

## 🖥️ Tech Stack

### Backend

* Java 17+
* Spring Boot (Maven)
* Spring Data JPA
* MongoDB, MySQL/PostgreSQL
* Spring Cloud Gateway

### Frontend

* Angular 20
* Tailwind CSS
* Angular CLI (Requires Node.js v20+)

### DevOps

* Docker
* GitHub Actions (CI/CD)

---

## 📦 Installation & Setup

### 🔧 Prerequisites

* Java 17 or higher
* Angular CLI (`npm install -g @angular/cli`)
* Node.js 20+
* Docker

### 📥 Clone Repository

```bash
git clone https://github.com/<your-username>/url-shortener.git
cd url-shortener
```

### 🚀 Backend Setup

```bash
cd backend
mvn clean install

# Start services individually
cd user-service && mvn spring-boot:run
cd ../url-generator && mvn spring-boot:run
cd ../cleaner-service && mvn spring-boot:run
```

### 🌐 Frontend Setup

```bash
cd frontend/shrinkit
npm install
ng serve --open
```

### 🛢️ Start MongoDB (Docker)

```bash
docker run -d -p 27017:27017 --name mongo mongo
```

---

## 📡 API Endpoints

### POST `/shorten`

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "shortUrl": "https://sho.rt/abc123"
}
```

### GET `/{shortKey}`

Redirects to the original long URL.

---

## 🧠 Database Schemas

### MongoDB (Document Store)

```json
{
  "user_id": "123",
  "short_url": "sho.rt/abc123",
  "long_url": "https://example.com/page",
  "expiration_date": "2025-08-01T00:00:00Z"
}
```

### MySQL (Hash Store)

```sql
CREATE TABLE hash_keys (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  hash VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT true
);
```

---

## 🤝 Contribution Guide

We welcome contributions from everyone!

### 🚀 Get Started

1. Fork this repository
2. Create a new branch
3. Make your changes
4. Open a Pull Request

### 🏷️ Labels to Check

* `good first issue`
* `help wanted`

📄 Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📁 Project Structure

```
url-shortener/
├── backend/                # Spring Boot services
│   ├── user-service/
│   ├── url-generator/
│   ├── cleaner-service/
│   └── api-gateway/
├── frontend/
│   └── angular-app/        # Angular 20 + TailwindCSS
├── docs/
│   ├── system-design.png   # Architecture diagram
│   └── architecture.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .github/
    └── ISSUE_TEMPLATE/
```

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more info.

---

## 💡 Roadmap / Future Enhancements

* QR Code generation
* Custom aliases
* 📈 Analytics dashboard
* ⏱️ URL expiration logic
* 🔐 Rate limiting & abuse protection
* 🌐 Deployment on cloud (AWS/GCP/Azure)

---

## 🙌 Join the Community

If you like this project, give it a ⭐ and share it!

> Let’s build the most elegant, microservices-based URL shortener together!
