
const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./connection');


const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                // View Employees by Department **BONUS**
                // View Employees by Manager **BONUS**
                'View All Departments', //(bonus show total salaries)
                'View All Roles',
                'Add New Employee',
                // Remove Employee **BONUS**
                'Add New Department',
                // Remove Department **BONUS**
                'Add New Role',
                // Remove Role **BONUS**
                'Update Employee Role',
                // Update Employee Managers **BONUS**
                'Exit'
            ],
            name: 'mainMenu',
        },
    ])
    .then((answer) => {
        switch (answer.mainMenu) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add New Employee':
                addNewEmployee();
                break;
            case 'Add New Department':
                addNewDepartment();
                break;
            case 'Add New Role':
                addNewRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                console.log("Goodbye");
                break;
        }
    });
}


const viewAllEmployees = () => {
    // show id, first_name, last_name, title, department, salary, manager
    const allEmployeeQuery = 
    'SELECT id, first_name, last_name FROM employees';
    // 'SELECT title, salary FROM roles';
    
    // 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary FROM employees';

    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

const viewAllDepartments = () => {
    // show department_id, department_name (and total salaries BONUS)
    const allDepartmentsQuery = 'SELECT * FROM departments';
    connection.query(allDepartmentsQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

const viewAllRoles = () => {
    // show role_id, title, department, salary
    const allRolesQuery = 'SELECT * FROM roles';
    connection.query(allRolesQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

// addNewEmployee()
    // first name?
    // last name?
    // role? from list
    // manager? from list

// addNewDepartment()
    // department name?

// addNewRole()
    // role name?
    // department?
    // salary?

// updateEmployeeRole()
    // which employee do you want to update? from list
    // change to which role? from list







mainMenu();