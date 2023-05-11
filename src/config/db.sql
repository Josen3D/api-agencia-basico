CREATE DATABASE IF NOT EXISTS agencia;

USE agencia;

CREATE TABLE users(
    id INT AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
	role ENUM("user", "admin") DEFAULT "user",
	createdAt DATE,
	updatedAt DATE,
	PRIMARY KEY(id)
);

DESCRIBE users;

CREATE TABLE messages(
    id INT AUTO_INCREMENT,
	name VARCHAR(50),
	email VARCHAR(100),
	message TEXT,
	createdAt DATE,
	updatedAt DATE,
	PRIMARY KEY(id)
);

DESCRIBE messages;

INSERT INTO messages(name, email, message, createdAt, updatedAt) VALUES('juan', 'juan@email.com', 'hola mundo', now(), now());