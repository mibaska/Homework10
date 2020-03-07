DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(30),
	PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER AUTO_INCREMENT NOT NULL,
	title VARCHAR(30),
	salary DECIMAL(10,4) NULL,
	department_id INTEGER(10),
	PRIMARY KEY (id)
);

CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER(10),
	manager_id INTEGER(10),
	PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ("Veritas");
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Worker", 10000, 1);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Mateo", "Carax", 1, 1);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("Marcus", "Avitus", 2, 1);