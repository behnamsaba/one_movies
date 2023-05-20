This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# one_movies project
### About the project
This is a comprehensive full-stack web application that communicates with the external TMDB API, alongside an internal PostgreSQL database which is utilized for user authentication and watchlist storage. Next.js is employed for both the frontend and backend, providing server-side rendering which optimizes SEO performance. The Redux toolkit has been used for managing internal states and functions.

## Requirements:

To run this project, the following packages are required:

- Node.js (version compatible with the listed dependencies)
- npm (generally comes with Node.js)
- To run this project in your local environment, Obtain your personal API key from [The Movie DB](https://www.themoviedb.org/) (put in .env.local file in route)


## Dependencies:

1. **@reduxjs/toolkit** (v1.9.5 or newer): Redux toolkit for efficient state management.
2. **autoprefixer** (v10.4.14): A tool to parse CSS and add vendor prefixes.
3. **axios** (v1.4.0 or newer): Promise-based HTTP client for the browser and Node.js.
4. **bcrypt** (v5.1.0 or newer): A library for hashing passwords.
5. **eslint** (v8.39.0): A tool for identifying and reporting on patterns in JavaScript.
6. **eslint-config-next** (v13.3.2): ESLint configuration for Next.js.
7. **formik** (v2.2.9 or newer): Library for building forms in React.
8. **jose** (v4.14.4 or newer): A comprehensive set of JWT, JWS, and JWE libraries.
9. **jsonschema** (v1.4.1 or newer): An implementation of JSON Schema for Node.js.
10. **jwt-decode** (v3.1.2 or newer): A small browser library that helps decoding JWTs.
11. **next** (v13.3.2): A React framework for production.
12. **pg** (v8.10.0 or newer): Non-blocking PostgreSQL client for Node.js.
13. **postcss** (v8.4.23): A tool for transforming CSS with JavaScript.
14. **react** (v18.2.0): A JavaScript library for building user interfaces.
15. **react-dom** (v18.2.0): Serves as the entry point of the DOM-related rendering paths.
16. **react-redux** (v8.0.5 or newer): Official React bindings for Redux.
17. **tailwindcss** (v3.3.2): A utility-first CSS framework.
18. **yup** (v1.1.1 or newer): A JavaScript schema builder for value parsing and validation.

## Running the Project:

After installing the necessary requirements and dependencies, you can use the following npm scripts:

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to find and fix problems in your JavaScript code.

Make sure to replace the npm command with yarn if you're using Yarn as your package manager.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
