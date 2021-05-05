
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const connection = require('./connection');



message();

function message() {
    figlet.text('Employee Management System', {
        font: 'bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.cyan(data));
        console.log("\n\nWelcome to the Employee Management System\n\n");
        mainMenu();
    })
};



function mainMenu() {
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

// *****NEEDS MANAGER NAME*********************************************
const viewAllEmployees = () => {
    // show employee_id, first_name, last_name, title, salary, department, manager
    const allEmployeeQuery = `SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name FROM employees
    INNER JOIN roles on roles.role_id = employees.role_id
    INNER JOIN departments on departments.department_id = roles.department_id`;

    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.green('***ALL EMPLOYEES***'));
        console.table(results);
        mainMenu();
    })
};

const viewAllDepartments = () => {
    // show department_id, department_name (and total salaries BONUS)
    const allDepartmentsQuery = `SELECT departments.department_id, departments.department_name FROM departments`;
    connection.query(allDepartmentsQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.green('***ALL DEPARTMENTS***'));
        console.table(results);
        mainMenu();
    })
};

const viewAllRoles = () => {
    // show role_id, title, department, salary
    const allRolesQuery = `SELECT roles.role_id, roles.title, roles.salary, departments.department_name FROM roles
    
    INNER JOIN departments on departments.department_id = roles.department_id`;
    connection.query(allRolesQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.green('***ALL ROLES***'));
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



    
  



