This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# one_movies project
### About the project
This is a comprehensive full-stack web application that communicates with the external TMDB API, alongside an internal PostgreSQL database which is utilized for user authentication and watchlist storage. Next.js is employed for both the frontend and backend, providing server-side rendering which optimizes SEO performance. The Redux toolkit has been used for managing internal states and functions.

## Requirements:

To run this project, the following packages are required:

- Node.js (version compatible with the listed dependencies)
- npm (generally comes with Node.js)
- To run this project in your local environment, Obtain your personal API key from [The Movie DB](https://www.themoviedb.org/) (put in .env.local file in root)


## Dependencies:

- "@reduxjs/toolkit": "^1.9.5" - Redux toolkit for managing state in React applications.
- "axios": "^1.4.0" - Promise-based HTTP client for making API requests.
- "bcrypt": "^5.1.0" - Library for hashing passwords and data securely.
- "eslint": "8.39.0" - JavaScript linter for identifying and reporting code errors and style issues.
- "eslint-config-next": "13.3.2" - ESLint configuration for Next.js projects.
- "formik": "^2.2.9" - Library for building forms in React with validation and error handling.
- "jose": "^4.14.4" - JavaScript library for JSON Object Signing and Encryption (JOSE).
- "jsonschema": "^1.4.1" - Implementation of JSON Schema for validating JSON data.
- "jwt-decode": "^3.1.2" - Library for decoding JSON Web Tokens (JWT).
- "next": "13.3.2" - Framework for server-rendered React applications.
- "pg": "^8.10.0" - PostgreSQL database client for Node.js.
- "react": "18.2.0" - JavaScript library for building user interfaces.
- "react-dom": "18.2.0" - Entry point for working with React in the browser.
- "react-icons": "^4.8.0" - Collection of customizable icons for React applications.
- "react-redux": "^8.0.5" - Official Redux bindings for React to simplify state management.
- "yup": "^1.1.1" - JavaScript schema validation library.

## DevDependencies:
- "autoprefixer": "^10.4.14" - CSS postprocessor for adding vendor prefixes automatically.
- "postcss": "^8.4.23" - Tool for transforming CSS with JavaScript plugins.
- "tailwindcss": "^3.3.2" - Utility-first CSS framework for rapid UI development.


## Running the Project:

After installing the necessary requirements and dependencies, you can use the following npm scripts:

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to find and fix problems in your JavaScript code.

Make sure to replace the npm command with yarn if you're using Yarn as your package manager.
