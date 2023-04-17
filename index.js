const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/config');

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      await db.close();
      process.exit();
      break;
  }

  mainMenu();
};

const viewAllDepartments = async () => {
  const departments = await db.viewAllDepartments();
  console.table(departments);
};

const viewAllRoles = async () => {
  const roles = await db.viewAllRoles();
  console.table(roles);
};

const viewAllEmployees = async () => {
  const employees = await db.viewAllEmployees();
  console.table(employees);
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    }
  ]);

  await db.addDepartment(name);
  console.log('Department added successfully.');
};

const addRole = async () => {
  // Fetch departments to select from
  const departments = await db.viewAllDepartments();

  const { title, salary, department } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Select the department:',
      choices: departments.map(department => ({ name: department.name, value: department.id }))
    }
  ]);

  await db.addRole(title, salary, department);
  console.log('Role added successfully.');
};

const addEmployee = async () => {
  // Fetch roles and employees to select from
  const roles = await db.viewAllRoles();
  const employees = await db.viewAllEmployees();

  const { first_name, last_name, role, manager } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the employee\'s role:',
      choices: roles.map(role => ({ name: role.title, value: role.id }))
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select the employee\'s manager:',
        choices: [
          { name: 'None', value: null },
          ...employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        ]
      }
    ]);
  
    await db.addEmployee(first_name, last_name, role, manager);
    console.log('Employee added successfully.');
  };
  
  const updateEmployeeRole = async () => {
    // Fetch employees and roles to select from
    const employees = await db.viewAllEmployees();
    const roles = await db.viewAllRoles();
  
    const { employee, newRole } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Select the employee to update:',
        choices: employees.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))
      },
      {
        type: 'list',
        name: 'newRole',
        message: 'Select the new role:',
        choices: roles.map(role => ({ name: role.title, value: role.id }))
      }
    ]);
  
    await db.updateEmployeeRole(employee, newRole);
    console.log('Employee role updated successfully.');
  };
  
  const init = async () => {
    await db.connect();
    mainMenu();
  };
  
  init();
  
