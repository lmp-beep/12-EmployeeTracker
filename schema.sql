-- // DEPARTMENTS table 
-- // engineering, finance, legal, sales, hr
-- // ID - INT PRIMARY KEY
-- // NAME - VARCHAR(30) to hold department name

-- // ROLES table
-- // ID - INT PRIMARY KEY
-- // TITLE - VARCHAR(30) to hold role title
-- // SALARY - DECIMAL to hold role salary
-- // DEPARTMENT ID - (Foreign Key) INT to hold reference to department role belongs to

-- // EMPLOYEES table
-- // ID - INT PRIMARY KEY
-- // FIRST NAME - VARCHAR(30) to hold employee first name
-- // LAST NAME - VARCHAR(30) to hold employee last name
-- // ROLE ID - (Foreign Key) INT to hold reference to role employee has
-- // MANAGER ID - (Foreign Key) INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager.


DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;


-- Departments Table --
-- Contains Department ID and Department Name --
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


-- Roles Table --
-- Contains Role ID, Title, Salary, and Department --
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


-- Employees Table --
-- Contains Employee ID, First Name, Last Name, Role, and Manager --
CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

