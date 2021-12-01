BEGIN;

--From https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql (sessions)
CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

INSERT INTO roles (description) VALUES
    ('Administrator'),
    ('Instructor'),
    ('Student');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255),
    type INTEGER NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (type) REFERENCES roles ON DELETE CASCADE
);

CREATE INDEX users_username ON users (username);

CREATE TABLE grades (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    -- Alternative: ID to specific offering of course (section/year)
    course_id BIGINT,
    gpa DECIMAL(4, 2),
    letter VARCHAR(5),
    FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE courses (
    area VARCHAR(4),
    code VARCHAR(4),
    prerequisite VARCHAR,
    PRIMARY KEY (area, code)
);

COMMIT;
