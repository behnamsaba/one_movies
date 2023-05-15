\echo 'Delete and recreate one_movies db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE one_movies;
CREATE DATABASE one_movies;
\connect one_movies

\i one_movies-schema.sql



