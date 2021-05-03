
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
    ("Software Engineer", 100000, 1),
    ("Senior Software Engineer", 120000, 1),

    ("Budget Analyst", 80000, 2),
    ("Payroll Manager", 100000, 2),

    ("Salesperson", 100000, 3),
    ("Sales Manager", 120000, 3),

    ("HR Manager", 120000, 4),

    ("Graphic Designer", 100000, 5),
    ("Web Designer", 100000, 5),
    ("Media Manager", 120000, 5);


-- Employees Seeds --
INSERT INTO employees (first_name, last_name, role_id)
VALUES 
    ("Janet", "Van Dyne", 1),
    ("Scott", "Lang", 1),
    ("Henry", "Pym", 2),

    ("Bruce", "Banner", 3),
    ("Steve", "Rogers", 4),

    ("Peter", "Parker", 5),
    ("Victor", "Shade", 6),
    
    ("Steven", "Strange", 7),

    ("Carol", "Danvers", 8),
    ("Frank", "Castle", 9),
    ("Wade", "Wilson", 10);


    -- UPDATE MANAGER ID --


-- Viewing Tables --
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

