# Healthz API

This is a simple `healthz` API that checks the connection to a MySQL database. If the database connection is successful, it returns a status code of `200`. Otherwise, it returns a status code of `503`. The API only allows `GET` requests, disallows URL parameters, and doesn't accept any request body.

## Prerequisites

Before building and running the application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

A `.env` file needs to be created with the following environment variables to configure the database connection:

```
DB_HOST=<your_mysql_host>
DB_USER=<your_mysql_user>
DB_PASS=<your_mysql_password>
DB_DBNAME=<your_database_name>
```

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate into the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the `.env` file with your MySQL database credentials.

## Usage

To run the server locally:

1. Start the MySQL database if it's not already running.

2. Start the Express server:

    ```bash
    npm start
    ```

The API will run on `http://localhost:3000` by default.

## Build and Deployment

### Build Instructions

No build steps are required for this.

### Deployment Instructions

To deploy the application:

1. Ensure that the MySQL database is available and accessible from your cloud environment.
2. Set the necessary environment variables (such as, `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_DBNAME`) in your deployment environment.

## API Endpoints

### GET `/healthz`

- **Description**: This endpoint checks if the MySQL database connection is successfully established.
- **Response**:
  - **200 OK**: If the connection to the database is successful.
  - **503 Service Unavailable**: If the connection to the database fails.

### Restrictions:
- Only `GET` requests are allowed.
- No query parameters or request bodies are permitted. The API will return a `400` status code if either is included.