CREATE DATABASE bloodmatch;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    passkey VARCHAR(255),
    name VARCHAR(255),
    bloodtype VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    phononum VARCHAR(255);
    LAT DOUBLE PRECISION,
    LON DOUBLE PRECISION;
);