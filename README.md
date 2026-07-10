# Express.js + TypeScript + PostgreSQL Todo API

A RESTful Todo API built with **Express.js**, **TypeScript**, and **PostgreSQL**. This project demonstrates how to build a scalable backend using Express, connect a PostgreSQL database with `pg` Pool, implement CRUD operations, use middleware, and manage relationships between users and todos.

---

## 🚀 Features

- ⚡ Express.js with TypeScript
- 🗄️ PostgreSQL Database
- 🔗 Database connection using `pg` Pool
- 👤 User CRUD Operations
- ✅ Todo CRUD Operations
- 🔄 One-to-Many relationship (One User → Many Todos)
- 🛣️ RESTful API Design
- 🧩 Express Middleware
- ❌ Global Not Found Route Handler
- 🌍 Environment Variable Configuration

---

## 🛠️ Technologies Used

- Express.js
- TypeScript
- PostgreSQL
- pg (Node PostgreSQL)
- dotenv
- ts-node-dev

---

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Go to the project folder

```bash
cd your-repository
```

Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
```

---

## ▶️ Run the Project

Development Mode

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Run production build

```bash
npm start
```

---

## 🗄️ Database

This project uses **PostgreSQL** as the database.

The connection is established using the **pg Pool**, which efficiently manages multiple database connections and improves application performance.

Example:

```ts
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
```

---

## 🧑 User API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

---

## ✅ Todo API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a single todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

---

## 🔗 Database Relationship

This project implements a **One-to-Many** relationship.

- One User can have multiple Todos.
- Every Todo belongs to one User.

```
User
-----
id (PK)
name
email

      │
      │ One
      ▼

Todo
-----
id (PK)
title
description
completed
user_id (FK)
```

---

## 🧩 Middleware

The project includes custom middleware for:

- Request handling
- Error handling
- 404 Not Found route

Example:

```ts
app.use("*", notFoundHandler);
```

---

## ❌ Not Found Route

If a user requests an endpoint that doesn't exist, the server returns:

```json
{
  "success": false,
  "message": "Route Not Found"
}
```

---

## 📚 What I Learned

- Building REST APIs using Express.js and TypeScript
- Installing and configuring PostgreSQL
- Connecting PostgreSQL using `pg` Pool
- Creating reusable database connections
- Designing relational databases
- Implementing One-to-Many relationships
- Performing CRUD operations
- Writing modular Express routes
- Using middleware in Express
- Handling invalid routes with a custom 404 middleware
- Managing environment variables with dotenv

---

## 🤝 Contributing

Contributions are welcome!

Feel free to fork this repository, create a new branch, and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mehedi Hasan Raju**

If you found this project helpful, don't forget to ⭐ the repository!
