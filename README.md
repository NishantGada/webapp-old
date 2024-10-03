# A02

In this assignment I created APIs for a User. It included - Create, Read, and Update APIs. Apart from that I used "BCrypt" to hash the password and store in the DB and used "Basic-Auth" to implement authorization when an API is called.

## Prerequisites

Before building and running the application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)

A `.env` file needs to be created with the following environment variables to configure the database connection:

```
DB_HOST=<your_postgre_host>
DB_USER=<your_postgre_user>
DB_PASS=<your_postgre_password>
DB_DBNAME=<your_database_name>
DB_DIALECT=<your_database_dialect>
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

4. Set up the `.env` file with your PostgreSQL database credentials.

## Usage

To run the server locally:

1. Start the PostgreSQL database if it's not already running.

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

1. Ensure that the PostgreSQL database is available and accessible from your cloud environment.
2. Set the necessary environment variables (such as, `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_DBNAME`, `DB_DIALECT`).

## API Endpoints

### GET `/healthz`

- **Description**: This endpoint checks if the PostgreSQL database connection is successfully established.
- **Response**:
  - **200 OK**: If the connection to the database is successful.
  - **503 Service Unavailable**: If the connection to the database fails.
  - **400 Bad Request**: If the request has a body or there are URL params present.
  - **405 Method Not Allowed**: If the method is any method other than GET

### GET `/v1/user/self`

- **Description**: This endpoint fetches the details of a specific user.
- **Response**:
  - **200 OK**: If the details were fetched successfully.
  - **400 Bad Request**: If the Basic Authorization fails due to any reason.

### POST `/v1/user`

- **Description**: This endpoint allows you to create a NEW user.
- **Response**:
  - **201 User Created**: If the was created and stored in the DB successfully.
  - **400 Bad Request**: If any request parameter is missing, unexpected, or if the user already exists.

### PUT `/v1/user/self`

- **Description**: This endpoint allows you to create a NEW user.
- **Response**:
  - **204 No Content**: If the was created and stored in the DB successfully.
  - **400 Bad Request**: If any request parameter is missing, unexpected, Basic Authorization fails due to any reason, or if the user already exists.