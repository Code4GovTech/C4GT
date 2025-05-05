# SchemeSkill Connect

A comprehensive open network platform for Haqdarshak's scheme training discovery using the MERN stack (MongoDB, Express, React, Node.js). This system enables scalable discovery of scheme training programs across multiple languages and integration points through ONDC/ONEST networks.

## Project Structure

```
SchemeSkill-Connect/
├── client/          # React frontend application
├── server/          # Node.js + Express API server
├── docs/            # API documentation and integration guides
└── README.md        # Project overview and setup instructions
```

## Features

- Multi-language support for scheme training discovery
- Integration with ONDC/ONEST networks
- Scalable architecture using MERN stack
- RESTful API endpoints
- Modern React-based user interface
- MongoDB database for flexible data storage

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn package manager

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

Detailed API documentation can be found in the `docs/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 