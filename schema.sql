-- // DEPARTMENTS table 
-- // engineering, finance, legal, sales, hr
-- // ID - INT PRIMARY KEY
-- // NAME - VARCHAR(30) to hold department name

-- // ROLES table
-- // ID - INT PRIMARY KEY
-- // TITLE - VARCHAR(30) to hold role title
-- // SALARY - DECIMAL to hold role salary
-- // DEPARTMENT ID - (FK?) INT to hold reference to department role belongs to

-- // EMPLOYEES table
-- // ID - INT PRIMARY KEY
-- // FIRST NAME - VARCHAR(30) to hold employee first name
-- // LAST NAME - VARCHAR(30) to hold employee last name
-- // ROLE ID - (FK?) INT to hold reference to role employee has
-- // MANAGER ID - (FK?) INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager.
