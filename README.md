# REACT TO SPRING FORUMS

A forums where you can find a lot of interesting topics.

## Table of Contents
- [Tech Stack](#i-tech-stack)
- [Features](#ii-features)
- [Setup Instructions](#iii-setup-instructions)
- [Available Scripts](#iv-available-scripts)
- [Learn More](#v-learn-more)

## I. Tech Stack
- **Languages**: JavaScript, Java, HTML, CSS
- **Frameworks & Libraries**: ReactJS, Bootstrap, Redux, Spring Boot
- **Database**: MySQL, MongoDB
- **Tools**: Git, GitHub, Postman, VS Code, IntelliJ IDEA
- **API Document**: Swagger

## II. Features
1. **User Authentication and Authorization**: Secure login and registration system with role-based access control.
2. **Create, Read, Update, and Delete Posts**: Users can create new posts, edit existing ones, and delete posts they own.
3. **Comment on Posts**: Users can comment on posts to engage in discussions.
4. **Real-time Notifications**: Users receive real-time notifications for various activities like new comments, friend requests, etc.
5. **Friend Requests and Management**: Users can send, accept, and manage friend requests.
6. **Admin Dashboard**: Admins have access to a dashboard to manage users and posts.
7. **Chat**: Real-time chat feature for users to communicate with each other.
8. **React Management**: Users can react to posts and comments with likes, dislikes, etc.

## III. Setup Instructions
1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd react-to-spring-forum
    ```
3. Install frontend dependencies:
    ```sh
    cd src/frontend/react-to-spring-forum
    npm install
    ```
4. Install backend dependencies:
    ```sh
    cd src/backend/React-To-Spring-Forums
    ./mvnw install
    ```
5. Set up the database and update the configuration in `application.yml` (contact for secret information such as env file)

## IV. Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
