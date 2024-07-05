# Smart Brain API

## Project Overview

Smart Brain is a face recognition app that detects faces in an image using the Clarifai API. This repository contains the backend code for handling user authentication, image submissions, and interactions with the Clarifai API.

### Features

- Creating our project server that connects to our front-end project.
- Registering our users.
- Updating our user profiles.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. **Clone the repository:**

    ```bash
        git clone https://github.com/yourusername/smart-brain-api.git
        cd smart-brain-api
    ```
2. **Install dependencies:**

    ```bash
        Copy code
        npm install
    ```

3. **Create a .env file in the root directory and add your environment variables:**

    ```env
        DATABASE_URL=your_database_url
        CLARIFAI_API_KEY=your_clarifai_api_key
        PORT=your_port_number
    ```

4. **Set up your PostgreSQL database with the required schema:**

    ```sql
        Copy code
        CREATE DATABASE smart_brain;
        \c smart_brain
        CREATE TABLE users (
            id serial PRIMARY KEY,
            name VARCHAR(100),
            email text UNIQUE NOT NULL,
            entries BIGINT DEFAULT 0,
            joined TIMESTAMP NOT NULL
        );

        CREATE TABLE login (
            id serial PRIMARY KEY,
            hash text NOT NULL,
            email text UNIQUE NOT NULL
        );
    ```
5. **Start the server:**

    ```bash
        Copy code
        npm start
    ```
6. **or for development:**

    ```bash
        Copy code
        npm run start:dev
    ```

7. **Test the endpoints using Postman or any other API testing tool.**

Note: Make sure you use PostgreSQL for this code base.