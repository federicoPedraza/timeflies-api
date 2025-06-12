# Timeflies API

<img src="https://github.com/user-attachments/assets/a1c30341-380f-4799-bae5-3b6fa68449e2" alt="Timeflies Icon" width="400px" />

Timeflies API is the backend service for the Timeflies calendar application. It provides a robust RESTful API for managing events, user authentication, and calendar operations.

## Features

- 🔐 **Authentication**: Secure JWT-based authentication system with refresh tokens
- 📅 **Event Management**: Full CRUD operations for calendar events with timezone support
- 🌍 **Timezone Support**: Server-side timezone handling for accurate event scheduling
- 🔄 **Real-time Updates**: WebSocket support for live updates across devices
- 📊 **Database Integration**: PostgreSQL with Knex.js query builder for reliable data storage
- 🌤️ **Weather Integration**: Weather forecast API integration for event planning
- 🐳 **Docker Support**: Containerized development and deployment for consistent environments

## Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: JWT with refresh tokens
- **Container**: Docker & Docker Compose
- **External APIs**: Weather API integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL
- Docker and Docker Compose

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/federicoPedraza/timeflies-api
   cd timeflies-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database Configuration
   POSTGRES_HOST=localhost
   POSTGRES_USER=anyuser
   POSTGRES_DB=timeflies_db
   POSTGRES_PASSWORD=anypassword
   POSTGRES_PORT=5432

   # Security
   JWT_SECRET=anysecret

   # External Services
   WEATHER_API_KEY=your_weather_api_key
   ```

   > **Note**: Get your Weather API key by:
   > 1. Sign up at [WeatherAPI.com](https://www.weatherapi.com/signup)
   > 2. Go to [WeatherAPI Dashboard](https://www.weatherapi.com/my/)
   > 3. Copy your API key and paste it in the `.env` file

4. **Start the development environment**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx knex migrate:latest
   ```

6. **Run the development environment**
    ```bash
    npm run dev
    ```

## API Documentation

### Authentication Endpoints (`/api/v1/users`)

#### User Registration and Authentication
- `POST /sign-up` - Register a new user
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- `POST /login` - Login user
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- `POST /refresh-token` - Refresh JWT token
  ```json
  {
    "refreshToken": "string"
  }
  ```

#### User Management
- `GET /check-email` - Check if email is available
  - Query: `email=string`

- `DELETE /me` - Delete current user
  ```json
  {
    "password": "string"
  }
  ```

- `PUT /change-password` - Change user password
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```

#### User Settings
- `GET /me` - Get user settings
- `PATCH /me` - Update user settings
  ```json
  {
    "settings": {
      "timezone": "string",
      // ... other settings
    }
  }
  ```

### Calendar Endpoints (`/api/v1/calendar`)

#### Event Management
- `GET /events` - Get all events
  - Query Parameters:
    - `start`: ISO date string
    - `end`: ISO date string

- `POST /create` - Create new event
  ```json
  {
    "title": "string",
    "start": "ISO date string",
    "end": "ISO date string",
    "description": "string",
    "location": "string"
  }
  ```

- `PUT /modify/:targetEventId` - Update event
  ```json
  {
    "title": "string",
    "start": "ISO date string",
    "end": "ISO date string",
    "description": "string",
    "location": "string"
  }
  ```

- `DELETE /delete/:targetEventId` - Delete event

#### Weather Integration
- `GET /weather` - Get weather forecast
  - Query Parameters:
    - `city`: string
    - `days`: number (1-3)

### Health Check Endpoint (`/api/v1/health`)

- `GET /` - Check API health status
  - Returns: `{ status: "ok", timestamp: "ISO date string" }`

## Development

### Database Migrations

#### Create a New Migration
```bash
npx knex migrate:make migration_name
```

#### Run Migrations
```bash
# Apply all pending migrations
npx knex migrate:latest

# Rollback the last migration
npx knex migrate:rollback

# Rollback all migrations
npx knex migrate:rollback --all
```

### Docker Support

The project includes Docker configuration for easy development and deployment:

```bash
# Start the development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the environment
docker-compose down
```
