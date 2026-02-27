# 🗺️ Land Demarcation Tracker (Backend)

A backend service to support digitization of land demarcation processes in Mahendragarh (Haryana), helping revenue officers and administrators log, track, and manage demarcation reports.

## 🚀 Getting Started

1. Navigate to the backend folder:
   ```
   cd land-demarcation-tracker/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your database credentials.

4. Start the development server:
   ```
   npm run dev
   ```

## 📦 Tech Stack

- **Node.js** + **Express** - Server framework
- **Sequelize ORM** - Database ORM with PostgreSQL
- **JWT Auth** - Authentication with role-based access
- **MVC architecture** - For clean code organization

## 📋 Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run test` - Run tests
- `npm run migrate` - Run database migrations
