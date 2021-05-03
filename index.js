
// What would you like to do?
// View Employees
// View Departments
// View Roles
// Add Employees
// Add Departments
// Add Roles
// Update Employee Roles

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

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'business',
  database: 'employeetracker_DB',
});














// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });