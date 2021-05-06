
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const connection = require('./connection');

// const deptIds = [];




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
                'Add New Department',
                'Remove Department',
                'Add New Role',
                // Remove Role **BONUS**
                'Add New Employee',
                // Remove Employee **BONUS**
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
            // case 'View Employees by Department':
            //     viewEmployeesByDept();
            //     break;
            // case 'View Employees by Manager':
            //     viewEmployeesByManager();
            //     break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add New Department':
                addNewDepartment();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Add New Role':
                addNewRole();
                break;
            // case 'Remove Role':
            //     removeRole();
            //     break;
            case 'Add New Employee':
                addNewEmployee();
                break;
            // case 'Remove Employee':
            //     removeEmployee();
            //     break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            // case 'Update Employee Managers':
            //     updateEmployeeManagers();
            //     break;   
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
    const allEmployeeQuery = `SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.department_name FROM employees
    INNER JOIN roles on roles.role_id = employees.role_id
    INNER JOIN departments on departments.department_id = roles.department_id`;
    // FULL JOIN employees on employees.manager_id = employees.last_name

    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(chalk.green('***ALL EMPLOYEES***'));
        console.table(results);
        mainMenu();
    })
};

// viewEmployeesByDept()

// viewEmployeesByManager()

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

const addNewDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartmentName',
            type: 'input',
            message: 'What is the name of the new department?',
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
            {
                department_name: answer.newDepartmentName,
            },
            (err) => {
                if (err) throw err;
                console.log("Your new department was created successfully!");
                viewAllDepartments();
            }
        );
    });
};

const removeDepartment = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        const dept = res.map(element => {
            return element.department_name
        })
        inquirer.prompt([
            {
                name: 'removeDepartment',
                type: 'list',
                message: "What department would you like to remove?",
                choices: dept,
            }
        ])
        .then((answer) => {
            connection.query(
                'DELETE FROM departments WHERE ?',
                {
                    department_name: answer.removeDepartment,
                },
                (err) => {
                    if (err) throw err;
                    console.log("The department has been removed successfully!");
                    viewAllDepartments();
                }
            );
        });
    })
};
   
// *****JOIN DEPT ID and DEPT NAME*************************************
const addNewRole = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        const roles = res.map(element => {
            return element.department_name
        })
        inquirer.prompt([
            {
                name: 'newRoleTitle',
                type: 'input',
                message: "What is the name of the new role?",
            },
            {
                name: 'newRoleDepartment',
                type: 'list',
                message: "What department is the new role in?",
                choices: roles,
            },
            {
                name: 'newRoleSalary',
                type: 'input',
                message: "What is the salary of the new role?",
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.newRoleTitle,
                    department_id: answer.newRoleDepartment,
                    salary: answer.newRoleSalary,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Your new role was created successfully!");
                    viewAllRoles();
                }
            );
        });
    })
};

// removeRole()


// addNewEmployee()
    // first name?
    // last name?
    // role? from list
    // manager? from list

// removeEmployee()

// updateEmployeeRole()
    // which employee do you want to update? from list
    // change to which role? from list

// updateEmployeeManagers()



    
  



