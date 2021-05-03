


// View All Employees
// View All Employees by Department
// View All Employees by Manager **BONUS**
// Update Employee Managers **BONUS**
// Add Employee 
// Remove Employee **BONUS**
// Update Employee Role
// Update Employee Manager **BONUS**
// View All Roles
// Add Role
// Remove Role **BONUS**
// View All Departments
// Add Department
// Remove Department **BONUS**
// View Total Utilized Budget by Department **BONUS**
// Quit




const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./connection');


const promptQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add New Employee',
                'Add New Department',
                'Add New Role',
                'Update Employee Role',
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


// viewAllEmployees()

// viewAllDepartments()

// viewAllRoles()

// addNewEmployee()

// addNewDepartment()

// addNewRole()

// updateEmployeeRole()








promptQuestions();