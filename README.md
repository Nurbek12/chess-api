# Chess Game API

## Overview

The Chess Game API provides endpoints for managing users, tournaments, and matches in a chess game application. This API is built using Express.js, MongoDB, and TypeScript, offering a robust and scalable solution for managing chess game data.

## Technologies Used

- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **TypeScript**: Superset of JavaScript for type safety and modern features
- **Swagger**: API documentation

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Nurbek12/chess-api
    ```

2. Navigate to the project directory:
    ```bash
    cd chess-game-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory and configure the required variables (e.g., database connection string, JWT secret).
    - ```
        JWT_ACCESS_SECRET = 
        JWT_REFRESH_SECRET = 
        MONGODB_URI = 
        PORT = 
    ```

5. Build the application
    
    ```bash
    npm run build
    ```

7. Run the application:

    ```bash
    npm start
    ```

## Testing

To run tests, use:

```bash
npm test