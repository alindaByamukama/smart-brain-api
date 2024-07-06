# Smart Brain API

## Project Overview

Smart Brain is a face recognition app that detects faces in an image using the Clarifai API. This repository contains the backend code for handling user authentication, image submissions, and interactions with the Clarifai API.

- **Frontend Repository for the Smart Brain App**: [here](https://github.com/alindaByamukama/smart-brain-frontend)

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

**Note:** Make sure you use PostgreSQL for this code base.

## API Documentation

### Endpoints

#### POST `/register`

Registers a new user.

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "name": "John",
    "password": "password"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "id": "1",
      "name": "John",
      "email": "john@example.com",
      "entries": 0,
      "joined": "2024-01-01T00:00:00.000Z"
    }
    ```
  - Failure: `400 Bad Request`
    ```json
    {
      "message": "unable to register"
    }
    ```
    
#### POST `/signin`

Authenticates a user.

- **URL**: `/signin`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "id": "1",
      "name": "John",
      "email": "john@example.com",
      "entries": 0,
      "joined": "2024-01-01T00:00:00.000Z"
    }
    ```
  - Failure: `400 Bad Request`
    ```json
    {
      "message": "wrong credentials"
    }
    ```

#### GET `/profile/:id`

Retrieves a user's profile.

- **URL**: `/profile/:id`
- **Method**: `GET`
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "id": "1",
      "name": "John",
      "email": "john@example.com",
      "entries": 0,
      "joined": "2024-01-01T00:00:00.000Z"
    }
    ```
  - Failure: `400 Bad Request`
    ```json
    {
      "message": "not found"
    }
    ```

#### PUT `/image`

Updates the entries count for a user.

- **URL**: `/image`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "id": "1"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "entries": 1
    }
    ```
  - Failure: `400 Bad Request`
    ```json
    {
      "message": "unable to get entries"
    }
    ```

#### POST `/imageurl`

Handles the Clarifai API call to detect faces in an image.

- **URL**: `/imageurl`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "input": "https://img.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-14474.jpg"
  }
  ```
- **Response**:
  - Success: `200 OK`
    ```json
    {
      "status": {
        "code": 10000,
        "description": "Ok",
        "req_id": "830aebd82df444e0a622d3682a8a1dae"
      },
      "outputs": [
        {
          "id": "1b491f8954ac40268f5ebb5dcbf7f0d2",
          "status": {
            "code": 10000,
            "description": "Ok"
          },
          "created_at": "2024-07-05T19:13:29.987537533Z",
          "model": {
            "id": "face-detection",
            "name": "Face",
            "created_at": "2020-11-25T16:50:24.453038Z",
            "modified_at": "2023-12-18T08:53:56.451338Z",
            "app_id": "main",
            "model_version": {
              "id": "6dc7e46bc9124c5c8824be4822abe105",
              "created_at": "2021-03-04T17:40:26.081729Z",
              "status": {
                "code": 21100,
                "description": "Model is trained and ready for deployment"
              },
              "visibility": {
                "gettable": 50
              },
              "app_id": "main",
              "user_id": "clarifai",
              "metadata": {}
            },
            "user_id": "clarifai",
            "model_type_id": "visual-detector",
            "visibility": {
              "gettable": 50
            },
            "toolkits": [],
            "use_cases": [],
            "languages": [],
            "languages_full": [],
            "check_consents": [],
            "workflow_recommended": false,
            "image": {
              "url": "https://data.clarifai.com/large/users/clarifai/apps/main/input_owners/luv_2261/inputs/image/35c370253c0138cfd8e0ad6afe0f67d9",
              "hosted": {
                "prefix": "https://data.clarifai.com",
                "suffix": "users/clarifai/apps/main/input_owners/luv_2261/inputs/image/35c370253c0138cfd8e0ad6afe0f67d9",
                "sizes": [
                  "small",
                  "large"
                ],
                "crossorigin": "use-credentials"
              }
            }
          },
          "input": {
            "id": "b91c3944d20d4d1eac164cb8e55b4821",
            "data": {
              "image": {
                "url": "https://img.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-14474.jpg",
                "base64": "dHJ1ZQ=="
              }
            }
          },
          "data": {
            "regions": [
              {
                "id": "09d3ae582e829a394504cb092de388e3",
                "region_info": {
                  "bounding_box": {
                    "top_row": 0.16418046,
                    "left_col": 0.25184146,
                    "bottom_row": 0.8389962,
                    "right_col": 0.75013465
                  }
                },
                "data": {
                  "concepts": [
                    {
                      "id": "ai_b1b1b1b1",
                      "name": "BINARY_POSITIVE",
                      "value": 1,
                      "app_id": "main"
                    }
                  ]
                },
                "value": 1
              }
            ]
          }
        }
      ]
    }
    ```
  - Failure: `400 Bad Request`
    ```json
    {
      "message": "unable to work with api"
    }
    ```
