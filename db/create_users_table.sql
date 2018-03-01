CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    user_name text,
    user_location text,
    email text,
    auth_id text
);