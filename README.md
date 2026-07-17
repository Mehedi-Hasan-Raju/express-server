# Express.js + TypeScript + PostgreSQL Todo API

A scalable RESTful Todo API built with **Express.js**, **TypeScript**, and **PostgreSQL**.

This project demonstrates backend development concepts including REST API design, PostgreSQL integration, CRUD operations, middleware handling, database relationships, and scalable backend architecture.

During development, I started with the traditional **MVC (Model-View-Controller)** pattern to understand separation of concerns and later refactored the project into a **Modular Architecture** to make the codebase more scalable and maintainable.

---

## 🚀 Features

- ⚡ Express.js with TypeScript
- 🗄️ PostgreSQL Database Integration
- 🔗 Database connection using `pg` Pool
- 👤 User CRUD Operations
- ✅ Todo CRUD Operations
- 🔄 One-to-Many Relationship (User → Todos)
- 🛣️ RESTful API Design
- 🧩 Express Middleware
- 🏗️ Modular Backend Architecture
- ⚙️ Service Layer Pattern
- ❌ Global Error & Not Found Handling
- 🌍 Environment Variable Configuration

---

## 🛠️ Technologies Used

- Express.js
- TypeScript
- PostgreSQL
- pg (Node PostgreSQL Driver)
- dotenv
- ts-node-dev
- Node.js

---

# 🏗️ Architecture Pattern

## MVC Pattern

Initially, this project was developed using the traditional **MVC (Model-View-Controller)** architecture.

MVC helped me understand:

- Separation of concerns
- Organizing routes, controllers, and database logic
- Managing application flow
- Writing cleaner backend code

Basic MVC structure:

```
src/
│
├── models/
├── controllers/
├── routes/
└── app.ts
```

---

## Modular Architecture

After understanding MVC, I refactored this project into a **Feature-Based Modular Architecture**.

Instead of keeping all models, controllers, and routes in separate folders, each feature contains its own related files.

Example:

```
src/
│
├── modules/
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.model.ts
│   │   └── user.route.ts
│   │
│   └── todo/
│       ├── todo.controller.ts
│       ├── todo.service.ts
│       ├── todo.model.ts
│       └── todo.route.ts
│
├── config/
├── middleware/
├── utils/
└── app.ts
```

Using Modular Architecture helped me understand how scalable backend applications are structured.

### Benefits of Modular Architecture:

- Better scalability
- Cleaner code organization
- Easier maintenance
- Feature-based development
- Better separation of business logic
- Easier collaboration in large projects

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Go to the project folder:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ Environment Variables

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

# ▶️ Run the Project

## Development Mode

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Production Mode

```bash
npm start
```

---

# 🗄️ Database

This project uses **PostgreSQL** as the database.

The connection is created using the **pg Pool**, which efficiently manages multiple database connections and improves application performance.

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

# 🧑 User API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get single user |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

---

# ✅ Todo API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get single todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

---

# 🔗 Database Relationship

This project implements a **One-to-Many Relationship**.

- One User can have multiple Todos.
- Each Todo belongs to one User.


```
User
----------------
id (Primary Key)
name
email


        |
        | One
        |
        ▼


Todo
----------------
id (Primary Key)
title
description
completed
user_id (Foreign Key)
```

---

# 🧩 Middleware

The project includes custom middleware for:

- Request handling
- Error handling
- Invalid route handling

Example:

```ts
app.use("*", notFoundHandler);
```

---

# ❌ Not Found Route Handler

If a user requests an invalid endpoint, the API returns:

```json
{
  "success": false,
  "message": "Route Not Found"
}
```

---

# 📚 What I Learned

- Building REST APIs using Express.js and TypeScript
- PostgreSQL database integration
- Using `pg` Pool for database connections
- Designing relational databases
- Implementing One-to-Many relationships
- Performing CRUD operations
- Understanding MVC architecture
- Refactoring MVC into Modular Architecture
- Creating scalable backend structures
- Separating business logic using service layers
- Using Express middleware
- Handling errors and invalid routes
- Managing environment variables

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork this repository, create a new branch, and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Mehedi Hasan Raju**

If you found this project helpful, don't forget to ⭐ the repository!
