
-- Departments Seeds --
INSERT INTO departments (department_name)
VALUES 
    ("Engineering"), 
    ("Finance"), 
    ("Sales"), 
    ("HR"), 
    ("Art");


-- Roles Seeds --
INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Software Engineer", 80000, 1),
    ("Senior Software Engineer", 100000, 1),

    ("Budget Analyst", 80000, 2),
    ("Payroll Manager", 100000, 2),

    ("Salesperson", 80000, 3),
    ("Sales Manager", 100000, 3),

    ("HR Specialist", 80000, 4),
    ("HR Manager", 100000, 4),

    ("Graphic Designer", 80000, 5),
    ("Web Designer", 100000, 5);
    

-- Employees Seeds --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Hope", "Van Dyne", 1, 2),
    ("Henry", "Pym", 2, NULL),

    ("Frank", "Castle", 3, 4),
    ("Steve", "Rogers", 4, NULL),

    ("Anthony", "Stark", 5, 6),
    ("Victor", "Shade", 6, NULL),
    
    ("Scott", "Lang", 7, 8),
    ("Henry", "McCoy", 8, NULL),

    ("Carol", "Danvers", 9, 10),
    ("Wade", "Wilson", 10, NULL);


-- Viewing Tables --
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

