# Hair Salon Appointment System

## Group: 4Fingers - INT3306 8

This is a server for a web-based application for managing appointments at a hair salon, where customers can book services and salon managers can manage the appointments.

## Project Overview

- **Backend**: NestJS, TypeORM, Node.js
- **Frontend**: React.js Vite
- **Database**: MySQL

## Table of Contents
1. [Frontend Setup](#frontend-setup)
2. [Backend Setup](#backend-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [API Documentation](#api-documentation)
---
## Frontend Setup

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Frontend Repository

You can find the frontend repository here:

[Frontend GitHub Repository](<https://github.com/hungsinh2k4/4FSalon>)

### Installation

1. Clone the repository:

```bash
git clone <link_to_frontend_repository>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder and add the following environment variables:

```bash
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GOOGLE_CLIENT_ID=<your_google_client_id>
```

4. Run the frontend:

```bash
npm start
```

By default, the frontend will run on Vite default.

---

## Backend Setup

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MySQL database

### Installation

1. Clone the repository:

```bash
git clone <link_to_backend_repository>
cd <your_dir_name> (default: 4f_salon)
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following content:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=<your_db_password>
DB_NAME=hair_salon
DB_DIALECT=mysql
DB_SYNCHRONIZE=`true` or `false`

GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=<expire_duration>

MAIL_HOST=<your_mail_host_service>
MAIL_PORT=<mail_port>
MAIL_USER=<your_mail>
MAIL_PASSWORD=<your_mail_password>
MAIL_SECURE=true

FRONTEND_URL=<your_frontend_url>
```

4. Run database migrations (if applicable):

```bash
npm run typeorm migration:run
```

5. Start the backend server:

```bash
npm run start:dev
```

By default, the backend will run on `http://localhost:8080`.

---

## Database Setup

### MySQL Database

1. Create a new MySQL database:

```sql
CREATE DATABASE hair_salon;
```

2. Update the `.env` file with your database connection details.

---

## Running the Application

### 1. Run the Frontend

From the `frontend` directory:

```bash
npm start
```

### 2. Run the Backend

From the `backend` directory:

```bash
npm run start:dev
```

Once both frontend and backend are running, you can access the app at:

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080/api`

---

## API Documentation

You can access the API documentation (Swagger) at:

`http://localhost:8080/api/docs`

---

## Contributions

Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the GPL-3.0 License.
```