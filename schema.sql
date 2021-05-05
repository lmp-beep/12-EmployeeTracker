
DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;


-- Departments Table --
-- Contains Department ID and Department Name --
CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);


-- Roles Table --
-- Contains Role ID, Title, Salary, and Department --
CREATE TABLE roles(
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


-- Employees Table --
-- Contains Employee ID, First Name, Last Name, Role, and Manager --
CREATE TABLE employees(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

