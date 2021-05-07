// Required Dependencies .........................................
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const connection = require("./connection");

// Welcome Message FIGLET........................................
message();
function message() {
  figlet.text(
    "Employee Management System",
    {
      font: "bulbhead",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 100,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.cyan(data));
      console.log("\n\nWelcome to the Employee Management System\n\n");
      mainMenu();
    }
  );
}

// Main Menu Questions...........................................
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add New Department",
          "Remove Department",
          "Add New Role",
          "Remove Role",
          "Add New Employee",
          "Remove Employee",
          "Update Employee Role",
          "Exit",
        ],
        name: "mainMenu",
      },
    ])
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add New Department":
          addNewDepartment();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Add New Role":
          addNewRole();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Add New Employee":
          addNewEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Goodbye");
          break;
      }
    });
}

// VIEW FUNCTIONS................................................
const viewAllEmployees = () => {
  const allEmployeeQuery =
    "SELECT e.employee_id AS Employee_ID, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, department_name AS Department, " +
    "e2.first_name AS Manager_First_Name, e2.last_name AS Manager_Last_Name " +
    "FROM employees AS E " +
    "INNER JOIN roles AS C ON E.role_id = c.role_id " +
    "INNER JOIN departments AS D ON C.department_id = d.department_id " +
    "LEFT JOIN employees AS E2 ON E.manager_id = E2.employee_id;";
  connection.query(allEmployeeQuery, (err, results) => {
    if (err) throw err;
    console.log(chalk.green("***ALL EMPLOYEES***"));
    console.table(results);
    mainMenu();
  });
};

const viewAllDepartments = () => {
  const allDepartmentsQuery = `SELECT departments.department_id AS Department_ID, departments.department_name AS Department FROM departments`;
  connection.query(allDepartmentsQuery, (err, results) => {
    if (err) throw err;
    console.log(chalk.green("***ALL DEPARTMENTS***"));
    console.table(results);
    mainMenu();
  });
};

const viewAllRoles = () => {
  const allRolesQuery = `SELECT roles.role_id AS Title_ID, roles.title AS Title, roles.salary AS Salary, departments.department_name AS Department FROM roles
    INNER JOIN departments on departments.department_id = roles.department_id`;
  connection.query(allRolesQuery, (err, results) => {
    if (err) throw err;
    console.log(chalk.green("***ALL ROLES***"));
    console.table(results);
    mainMenu();
  });
};

// ADD/REMOVE DEPARTMENTS.......................................
const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartmentName",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.newDepartmentName,
        },
        (err) => {
          if (err) throw err;
          viewAllDepartments();
          console.log(
            chalk.red("Your new department was created successfully!")
          );
        }
      );
    });
};

const removeDepartment = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    const dept = res.map((element) => {
      return element.department_name;
    });
    inquirer
      .prompt([
        {
          name: "removeDepartment",
          type: "list",
          message: "What department would you like to remove?",
          choices: dept,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM departments WHERE ?",
          {
            department_name: answer.removeDepartment,
          },
          (err) => {
            if (err) throw err;
            viewAllDepartments();
            console.log(
              chalk.red("The department has been removed successfully!")
            );
          }
        );
      });
  });
};

// ADD/REMOVE ROLES............................................
const addNewRole = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    const depts = res.map((element) => {
      return { name: element.department_name, value: element.department_id };
    });
    inquirer
      .prompt([
        {
          name: "newRoleTitle",
          type: "input",
          message: "What is the name of the new role?",
        },
        {
          name: "newRoleDepartment",
          type: "list",
          message: "What department is the new role in?",
          choices: depts,
        },
        {
          name: "newRoleSalary",
          type: "input",
          message: "What is the salary of the new role?",
        },
      ])
      .then((answer) => {
        connection.query(
          `INSERT INTO roles SET ?`,
          {
            title: answer.newRoleTitle,
            department_id: answer.newRoleDepartment,
            salary: answer.newRoleSalary,
          },
          (err) => {
            if (err) throw err;
            viewAllRoles();
            console.log(chalk.red("Your new role was created successfully!"));
          }
        );
      });
  });
};

const removeRole = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    const role = res.map((element) => {
      return element.title;
    });
    inquirer
      .prompt([
        {
          name: "removeRole",
          type: "list",
          message: "What role would you like to remove?",
          choices: role,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM roles WHERE ?",
          {
            title: answer.removeRole,
          },
          (err) => {
            if (err) throw err;
            viewAllRoles();
            console.log(chalk.red("The role has been removed successfully!"));
          }
        );
      });
  });
};

// ADD/REMOVE EMPLOYEES.......................................
const addNewEmployee = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    const empRole = res.map((element) => {
      return { name: element.title, value: element.role_id };
    });
    inquirer
      .prompt([
        {
          name: "newEmployeeFirstName",
          type: "input",
          message: "What is the first name of the new employee?",
        },
        {
          name: "newEmployeeLastName",
          type: "input",
          message: "What is the last name of the new employee?",
        },
        {
          name: "newEmployeeRole",
          type: "list",
          message: "What role is the new employee in?",
          choices: empRole,
        },
        //   {
        //     name: "newEmployeeManager",
        //     type: "input",
        //     message: "Who is the manager of the new employee?",
        //     choices:
        //   },
      ])
      .then((answer) => {
        connection.query(
          `INSERT INTO employees SET ?`,
          {
            first_name: answer.newEmployeeFirstName,
            last_name: answer.newEmployeeLastName,
            role_id: answer.newEmployeeRole,
            //   manager_id: answer.newEmployeeManager,
          },
          (err) => {
            if (err) throw err;
            viewAllEmployees();
            console.log(chalk.red("Your new employee was added successfully!"));
          }
        );
      });
  });
};

const removeEmployee = () => {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    const employee = res.map((element) => {
      return {
        name: element.first_name + " " + element.last_name,
        value: element.employee_id,
      };
    });
    inquirer
      .prompt([
        {
          name: "removeEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employee,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM employees WHERE ?",
          {
            employee_id: answer.removeEmployee,
          },
          (err) => {
            if (err) throw err;
            viewAllEmployees();
            console.log(
              chalk.red("The employee has been removed successfully!")
            );
          }
        );
      });
  });
};

// UPDATE EMPLOYEES..........................................
const updateEmployeeRole = () => {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    const employeeList = res.map((element) => {
      return {
        name: element.first_name + " " + element.last_name,
        value: element.employee_id,
      };
    });
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      const rolesList = res.map((element) => {
        return {
          name: element.title,
          value: element.role_id,
        };
      });
      inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeList,
          },
          {
            name: "updateEmployeeRole",
            type: "list",
            message: "Choose a new role for this employee:",
            choices: rolesList,
          },
        ])
        .then((answer) => {
          connection.query(
            `UPDATE employees SET role_id = ${answer.updateEmployeeRole} WHERE employee_id = ${answer.updateEmployee}`,
            {
              role_id: answer.updateEmployeeRole,
              employee_id: answer.updateEmployee,
            },
            (err) => {
              if (err) throw err;
              viewAllEmployees();
              console.log(
                chalk.red("The employee's role has been changed successfully!")
              );
            }
          );
        });
    });
  });
};
