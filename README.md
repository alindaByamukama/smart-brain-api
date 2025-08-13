# Smart Brain API

## Project Overview

Smart Brain is a face recognition app that detects faces in an image using the Clarifai API. This repository contains the backend code for handling user authentication, image submissions, and interactions with the Clarifai API.

- **Frontend Repository**: [Smart Brain Frontend](https://github.com/alindaByamukama/smart-brain-frontend)

---

## Features
- API server for the Smart Brain front-end
- User registration and authentication
- Face detection via Clarifai API
- Updates to user profile image count

---

## Setup Instructions

### **Prerequisites**
- Node.js and npm installed
- PostgreSQL installed and running
- Clarifai API key

---

### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/smart-brain-api.git
cd smart-brain-api
```
### **2. Install dependencies**
```bash
npm install
```
### **3. Environment variables**
Create a .env file in the root:
```env
DATABASE_URL=postgres://myuser:mypassword@localhost:5432/smart_brain
CLARIFAI_API_KEY=your_clarifai_api_key
PORT=8080
```
For Railway or production, use the hosted DB URL as DATABASE_URL.
### **4. PostgreSQL Setup (Local)**
**Create the database**
```bash
sudo -u postgres psql
CREATE DATABASE smart_brain;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE smart_brain TO myuser;
\q
```
**Grant schema privileges**
```bash
sudo -u postgres psql -d smart_brain
GRANT ALL PRIVILEGES ON SCHEMA public TO myuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO myuser;
\q
```
**Create required tables**
```sql
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
### **5. Test the database connection**
The API includes a /testdb route for quick checks:
```bash
npm start
```
Then visit:
```bash
http://localhost:8080/testdb
```
If the DB is connected, you’ll get an empty array [] (if no users exist).
### **6. Start the API**
Development mode:
```bash
npm run start:dev
```
Production mode:
```bash
npm start
```
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