const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//localhost with .env hide password and user
require("dotenv").config();
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'Employee_Tracker_db',
});

//connection to app
connection.connect(err => {
  if (err) throw err;
  console.log("WELCOME TO EMPLOYEE TRACKER APP");
  startMenu();
});

//display the menu list
const startMenu = () => {
  inquirer.prompt({
      message: 'What would you like to do today?',
      name: 'menu',
      type: 'list',
      choices: [ 
        'View all departments',
        'View all jobs',
        'View all employees',
        'Add a department',
        'Add a job',
        'Add an employee',
        'Update employee job',
        'Exit',
      ],
    })
    .then(response => {
        switch (response.menu) {
        case 'View all departments':
          viewDepartment();
          break;
        case 'View all jobs':
          viewJobs();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a job':
          addJob();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee job':
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

//select from department
const viewDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

//select from job
const viewJobs = () => {
  connection.query('SELECT * FROM job', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

//view employee info
const viewEmployees = () => {
  connection.query(
    'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

//input for department
const addDepartment = () => {
  inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the department name?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department added!');
          startMenu();
        }
      );
    });
};

//input job title, salary and id
const addJob = () => {
  inquirer.prompt([
      {
        name: 'jobTitle',
        type: 'input',
        message: 'What is the job title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this job?',
      },
      {
        name: 'deptId',
        type: 'input',
        message: 'What is the department ID number?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.jobTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log('Job added!');
          startMenu();
        }
      );
    });
};

// add employee to the list
const addEmployee = () => {
  inquirer.prompt([
      {
        name: 'nameFirst',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'nameLast',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'jobId',
        type: 'input',
        message: "What is the employee's job id?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the manager Id?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added!');
          startMenu();
        }
      );
    });
};

//update employee info
const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'jobId',
        type: 'input',
        message: 'Enter new job id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employee SET job_id=? WHERE id=?',
        [answer.jobId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          startMenu();
        }
      );
    });
};