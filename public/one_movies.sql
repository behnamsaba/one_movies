\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE one_movies;
CREATE DATABASE one_movies;
\connect one_movies

\i one_movies-schema.sql
-- \i jobly-seed.sql


