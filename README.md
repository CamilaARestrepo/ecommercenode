# 🚚 Electiva2 Ecommerce - Envios Perdidos


## 📖 Overview

Backend API (Node.js + TypeScript) for user management following **Hexagonal Architecture** (Ports & Adapters) and **DDD** principles.  
Includes user creation flow with request validation and MongoDB persistence (via Mongoose).

---

## 🛠️ Tech Stack

- **Node.js**
- **TypeScript**
- **Express v5**
- **Mongoose (MongoDB ODM)**
- **dotenv**

Dev tools:
- `ts-node-dev`
- `@types/node`, `@types/express`

---

## ⚡ Quick Start

### 1️⃣ Clone the repository

```sh
git clone https://github.com/NMEJIA93/electiva2_ecommerce_enviosperdidos.git
cd electiva2_ecommerce_enviosperdidos
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```sh
cp .env.example .env
```

Example:
```
PORT=5000
MONGOATLAS_URL=mongodb+srv://<user>:<password>@<cluster-url>
DB_NAME=electiva2
```

### 4️⃣ Run the server

```sh
npm run start
```

Server will be running at: [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

### 📝 Swagger UI

Interactive API documentation is available via Swagger.

- Open [http://localhost:5000/api/v1/api-docs](http://localhost:5000/api/v1/api-docs) in your browser.

The documentation is defined in [`swagger.yaml`](swagger.yaml).

---

## 📦 Endpoints

Base path: `/api/v1`

| Method | Endpoint      | Description         |
|--------|--------------|---------------------|
| POST   | `/user`      | Create a new user   |

For request/response details, see the [Swagger UI](http://localhost:5000/api/v1/api-docs).

---

## 🧭 Project Structure

```
src/
  app.ts
  application/
    controllers/
    dtos/
    middlewares/
    routes/
  domain/
    entities/
    models/
      interfaces/
    repositories/
    services/
  infraestructure/
    config/
    database/
    interface/
    repositories/
swagger.yaml
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)