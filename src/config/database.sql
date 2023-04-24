CREATE DATABASE agencia;

USE agencia;

CREATE TABLE users(
    id_user INT AUTO_INCREMENT,
	name VARCHAR(50),
	email VARCHAR(100),
    password VARCHAR(150),
	createdAt DATE,
	updatedAt DATE,
	PRIMARY KEY(id_user)
);

DESCRIBE users;

CREATE TABLE messages(
    id_message INT AUTO_INCREMENT,
	name VARCHAR(50),
	email VARCHAR(100),
	message TEXT,
	createdAt DATE,
	updatedAt DATE,
	PRIMARY KEY(id_message)
);

DESCRIBE messages;

INSERT INTO users(name, email, createdAt, updatedAt) VALUES('admin', 'admin@elite.com', now(), now());