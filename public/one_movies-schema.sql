CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE Media (
  api_Id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  poster_path TEXT NOT NULL,
  rating TEXT NOT NULL,
  release_date TEXT NOT NULL
);

CREATE TABLE users_media (
  username VARCHAR(25) NOT NULL REFERENCES users,
  api_Id INTEGER NOT NULL REFERENCES Media,
  PRIMARY KEY (username, api_Id)
);