BEGIN;

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
);

INSERT INTO roles (description) VALUES
    ('Instructor'),
    ('Student');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255),
    type INTEGER NOT NULL,
    FOREIGN KEY (type) REFERENCES roles ON DELETE CASCADE
);

COMMIT;