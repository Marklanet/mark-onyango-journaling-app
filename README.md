# Personal Journaling App

## Overview

This project is a personal journaling app that allows users to write, categorize, and view their journal entries. The app consists of a mobile application built with React Native and a backend service using GraphQL with TypeScript.

## Project Structure

### Backend

- **Language**: TypeScript
- **Framework**: Apollo Server for GraphQL
- **Database**: MySQL
- **ORM**: Sequelize

  #### Reason For choosing GraphQL over Rest API For the App

  GraphQL offers significant advantages over REST for a journaling application, including flexible and efficient data fetching, as it allows clients to request exactly the data needed, reducing over-fetching and under-fetching. It uses a single endpoint, simplifying communication and reducing complexity. Its strongly typed schema ensures a self-documenting API and type safety, enhancing developer productivity. Real-time capabilities through subscriptions improve user experience with live updates. GraphQL also allows seamless API evolution without versioning, enabling backward compatibility and minimizing disruptions. Overall, these benefits make GraphQL a more performant, maintainable, and user-friendly choice for a journaling Application.

### Frontend

- **Language**: TypeScript
- **Framework**: React Native with Expo

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- MySQL (version 5.7 or higher)

### Backend Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install Dependancies**:

    ```bash
    cd ./backend
    npm install
    ```

3.  **Create .env File**

    ```bash
    mkdir .env
    ```

4.  **Modify .env File**

    Paste this in the .env file and modify db username and password accordingly

    DB_HOST=localhost

    DB_PORT=3306

    DB_USERNAME=username

    DB_PASSWORD=password

    DB_NAME=journal_app

    PORT=4000

    SALT_ROUNDS=10

    JWT_SECRET=secret

5.  **Create the Database**

    Create Schema in MySQL Database called "journal_app"

    The app will auto create the tables

6.  **Start The Backend**:

    ```bash
    npm start
    ```

7.  **Testing The Backend on Postman**:

    Open Postman

    Create a new request of type graphQL

    Paste the url of the server

    Go to Schema tab and select the option for importing the schema

    import the file named introspection.ts

    The querries will auto populate

### Frontend Setup

1.  **Install Dependancies**:

    ```bash
    cd ./frontend
    npm install
    ```

1.  **Start The Frontend**:

    ```bash
    npm start
    ```

### App Screenshots

**Login**
<img width="400" alt="Screenshot 2024-05-15 at 19 10 51" src="./login.png">

**Register**
<img width="400" alt="Screenshot 2024-05-15 at 19 10 51" src="./register.png">

**Home**
<img width="400" alt="Screenshot 2024-05-15 at 19 10 51" src="./home.png">
