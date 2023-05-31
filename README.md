# One_Movies Project

Click [here](https://one-movies.vercel.app/) to explore the live project.

## Overview

One_Movies is a robust full-stack web application that leverages the TMDB API for external communication and an internal PostgreSQL database for user authentication and watchlist storage. The project is built using Next.js, a framework offering server-side rendering for improved SEO performance. State management and function handling are expertly executed through the Redux toolkit.

## Prerequisites

To run this project locally, the following resources are needed:

- Node.js (Ensure the version is compatible with the dependencies)
- npm (Usually bundled with Node.js)
- A personal API key from [The Movie DB](https://www.themoviedb.org/) (Place this in a .env.local file at the root)

## Dependencies

The application utilizes a number of dependencies including:

- `@reduxjs/toolkit`: Redux toolkit for state management in React applications.
- `axios`: Promise-based HTTP client for API calls.
- `bcrypt`: Library for secure hashing of passwords and data.
- `eslint` and `eslint-config-next`: JavaScript linter and ESLint configuration for Next.js projects.
- `formik`: Library for building React forms with validation and error handling.
- `jose`: JavaScript library for JSON Object Signing and Encryption (JOSE).
- `jsonschema`: An implementation of JSON Schema for validating JSON data.
- `jwt-decode`: Library for decoding JSON Web Tokens (JWT).
- `next`: Framework for server-rendered React applications.
- `pg`: PostgreSQL client for Node.js.
- `react` and `react-dom`: JavaScript libraries for building user interfaces.
- `react-icons`: A set of customizable icons for React applications.
- `react-redux`: Official Redux bindings for React for simplified state management.
- `yup`: JavaScript schema validation library.

## DevDependencies

The application uses several development dependencies:

- `autoprefixer`: CSS postprocessor for automatic vendor prefix addition.
- `postcss`: A tool for transforming CSS with JavaScript plugins.
- `tailwindcss`: Utility-first CSS framework for rapid UI development.

## Running the Project

After the prerequisites and dependencies are installed, use these npm scripts:

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to identify and correct issues in your JavaScript code.

Use `yarn` instead of `npm` if Yarn is your package manager.

The project is currently deployed on Vercel.
