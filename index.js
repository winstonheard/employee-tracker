// const inquirer = require('inquirer');
// const cTable = require('console.table');
// const db = require('./config/config');

// const mainMenu = async () => {
//   const { action } = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'action',
//       message: 'What would you like to do?',
//       choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//         'Update employee manager',
//         'View employees by manager',
//         'View employees by department',
//         'Delete a department',
//         'Delete a role',
//         'Delete an employee',
//         'View department budget',
//         'Exit'
//       ]
//     }
//   ]);

//   switch (action) {
//     case 'View all departments':
//       await viewAllDepartments();
//       break;
//     case 'View all roles':
//       await viewAllRoles();
//       break;
//     case 'View all employees':
//       await viewAllEmployees();
//       break;
//     case 'Add a department':
//       await addDepartment();
//       break;
//     case 'Add a role':
//       await addRole();
//       break;
//     case 'Add an employee':
//       await addEmployee();
//       break;
//     case 'Update an employee role':
//       await updateEmployeeRole();
//       break;
//     case 'Exit':
//       await db.close();
//       process.exit();
//       break;
//   }

//   mainMenu();
// };

// const viewAllDepartments = async () => {
//   const departments = await db.viewAllDepartments();
//   console.table(departments);
// };

// const viewAllRoles = async () => {
//   const roles = await db.viewAllRoles();
//   console.table(roles);
// };

// const viewAllEmployees = async () => {
//   const employees = await db.viewAllEmployees();
//   console.table(employees);
// };

// const addDepartment = async () => {
//   const { name } = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter the department name:'
//     }
//   ]);

//   await db.addDepartment(name);
//   console.log('Department added successfully.');
// };

// const addRole = async () => {
//   // Fetch departments to select from
//   const departments = await db.viewAllDepartments();

//   const { title, salary, department } = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'title',
//       message: 'Enter the role title:'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter the role salary:'
//     },
//     {
//       type: 'list',
//       name: 'department',
//       message: 'Select the department:',
//       choices: departments.map(department => ({ name: department.name, value: department.id }))
//     }
//   ]);

//   await db.addRole(title, salary, department);
//   console.log('Role added successfully.');
// };

// const addEmployee = async () => {
//   // Fetch roles and employees to select from
//   const roles = await db.viewAllRoles();
//   const employees = await db.viewAllEmployees();

//   const { first_name, last_name, role, manager } = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'first_name',
//       message: 'Enter the employee\'s first name:'
//     },
//     {
//       type: 'input',
//       name: 'last_name',
//       message: 'Enter the employee\'s last name:'
//     },
//     {
//       type: 'list',
//       name: 'role',
//       message: 'Select the employee\'s role:',
//       choices: roles.map(role => ({ name: role.title, value: role.id }))
//     },
//     {
//         type: 'list',
//         name: 'manager',
//         message: 'Select the employee\'s manager:',
//         choices: [
//           { name: 'None', value: null },
//           ...employees.map(employee => ({
//             name: `${employee.first_name} ${employee.last_name}`,
//             value: employee.id
//           }))
//         ]
//       }
//     ]);
  
//     await db.addEmployee(first_name, last_name, role, manager);
//     console.log('Employee added successfully.');
//   };
  
//   const updateEmployeeRole = async () => {
//     // Fetch employees and roles to select from
//     const employees = await db.viewAllEmployees();
//     const roles = await db.viewAllRoles();
  
//     const { employee, newRole } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'employee',
//         message: 'Select the employee to update:',
//         choices: employees.map(employee => ({
//           name: `${employee.first_name} ${employee.last_name}`,
//           value: employee.id
//         }))
//       },
//       {
//         type: 'list',
//         name: 'newRole',
//         message: 'Select the new role:',
//         choices: roles.map(role => ({ name: role.title, value: role.id }))
//       }
//     ]);
  
//     await db.updateEmployeeRole(employee, newRole);
//     console.log('Employee role updated successfully.');
//   };

//   // Update employee manager
// const updateEmployeeManager = async () => {
//     const employees = await db.viewAllEmployees();
  
//     const { employee, newManager } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'employee',
//         message: 'Select the employee to update:',
//         choices: employees.map(employee => ({
//           name: `${employee.first_name} ${employee.last_name}`,
//           value: employee.id
//         }))
//       },
//       {
//         type: 'list',
//         name: 'newManager',
//         message: 'Select the new manager:',
//         choices: [
//           { name: 'None', value: null },
//           ...employees.map(employee => ({
//             name: `${employee.first_name} ${employee.last_name}`,
//             value: employee.id
//           }))
//         ]
//       }
//     ]);
  
//     await db.updateEmployeeManager(employee, newManager);
//     console.log('Employee manager updated successfully!');
//   };
  
//   // View employees by manager
//   const viewEmployeesByManager = async () => {
//     const managers = await db.viewAllManagers();
  
//     const { manager } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'manager',
//         message: 'Select a manager to view employees:',
//         choices: managers.map(manager => ({
//           name: `${manager.first_name} ${manager.last_name}`,
//           value: manager.id
//         }))
//       }
//     ]);
  
//     const employees = await db.viewEmployeesByManager(manager);
//     console.table(employees);
//   };
  
//   // View employees by department
//   const viewEmployeesByDepartment = async () => {
//     const departments = await db.viewAllDepartments();
  
//     const { department } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'department',
//         message: 'Select a department to view employees:',
//         choices: departments.map(department => ({
//           name: department.name,
//           value: department.id
//         }))
//       }
//     ]);
  
//     const employees = await db.viewEmployeesByDepartment(department);
//     console.table(employees);
//   };
  
//   // Delete a department
//   const deleteDepartment = async () => {
//     const departments = await db.viewAllDepartments();
  
//     const { department } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'department',
//         message: 'Select the department you want to delete:',
//         choices: departments.map(department => ({
//           name: department.name,
//           value: department.id
//         }))
//       }
//     ]);
  
//     await db.deleteDepartment(department);
//     console.log('Department deleted successfully!');
//   };
  
//   // Delete a role
//   const deleteRole = async () => {
//     const roles = await db.viewAllRoles();
  
//     const { role } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'role',
//         message: 'Select the role you want to delete:',
//         choices: roles.map(role => ({
//           name: role.title,
//           value: role.id
//         }))
//       }
//     ]);
  
//     await db.deleteRole(role);
//     console.log('Role deleted successfully!');
//   };
  
//   // Delete an employee
//   const deleteEmployee = async () => {
//     const employees = await db.viewAllEmployees();
  
//     const { employee } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'employee',
//         message: 'Select the employee you want to delete:',
//         choices: employees.map(employee => ({
//           name: `${employee.first_name} ${employee.last_name}`,
//           value: employee.id
//         }))
//       }
//     ]);
  
//     await db.deleteEmployee(employee);
//     console.log('Employee deleted successfully!');
//   };
  
//   // View department budget
//   const viewDepartmentBudget = async () => {
//     const departments = await db.viewAllDepartments();
  
//     const { department } = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'department',
//         message: 'Select a department to view its budget:',
//         choices: departments.map(department => ({
//           name: department.name,
//           value: department.id
//         }))
//       }
//     ]);
  
//     const budget = await db.viewDepartmentBudget(department);
//     console.log(`The total utilized budget of the ${budget.name} department is ${budget.utilized_budget}`);
//   };
  
  
  
//   const init = async () => {
//     await db.connect();
//     mainMenu();
//   };
  
//   init();

const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/config');

async function run() {
    while (true) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee Role',
          'Update Employee Manager',
          'View Employees by Manager',
          'View Employees by Department',
          'Delete Department',
          'Delete Role',
          'Delete Employee',
          'View Department Budget',
          'Exit',
        ],
      });
  
      switch (action) {
        case 'View All Departments':
          const departments = await db.viewAllDepartments();
          console.table(departments);
          break;
        case 'View All Roles':
          const roles = await db.viewAllRoles();
          console.table(roles);
          break;
        case 'View All Employees':
          const employees = await db.viewAllEmployees();
          console.table(employees);
          break;
        case 'Add Department':
          const { departmentName } = await inquirer.prompt({
            type: 'input',
            name: 'departmentName',
            message: 'Enter the department name:',
          });
          await db.addDepartment(departmentName);
          console.log(`Added department: ${departmentName}`);
          break;
        case 'Add Role':
          const departmentsList = await db.viewAllDepartments();
          const departmentChoices = departmentsList.map(({ id, name }) => ({
            name: name,
            value: id,
          }));
          const { title, salary, department_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the role title:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the role salary:',
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'Choose the department for this role:',
              choices: departmentChoices,
            },
          ]);
          await db.addRole(title, salary, department_id);
          console.log(`Added role: ${title}`);
          break;
        case 'Add Employee':
          const rolesList = await db.viewAllRoles();
          const roleChoices = rolesList.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          const employeesList = await db.viewAllEmployees();
          const addEmployeeManagerChoices = employeesList.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          
          addEmployeeManagerChoices.unshift({ name: 'None', value: null });
  
          const { first_name, last_name, role_id, addEmployeeManager_id } = await inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'Enter the employee first name:',
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'Enter the employee last name:',
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Choose the role for this employee:',
              choices: roleChoices,
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Choose the manager for this employee:',
              choices: addEmployeeManagerChoices,
            },
          ]);
          await db.addEmployee(first_name, last_name, role_id, addEmployeeManager_id);
        console.log(`Added employee: ${first_name} ${last_name}`);
        break;
      case 'Update Employee Role':
        const employeesList2 = await db.viewAllEmployees();
        const employeeChoices = employeesList2.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));
        const rolesList2 = await db.viewAllRoles();
        const roleChoices2 = rolesList2.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        const { employee_id, new_role_id } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Choose the employee to update:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'new_role_id',
            message: 'Choose the new role for the employee:',
            choices: roleChoices2,
          },
        ]);
        await db.updateEmployeeRole(employee_id, new_role_id);
        console.log('Updated employee role');
        break;
        case 'Update Employee Manager':
            const employeesList3 = await db.viewAllEmployees();
            const employeeChoices3 = employeesList3.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            const { emp_id, new_manager_id } = await inquirer.prompt([
              {
                type: 'list',
                name: 'emp_id',
                message: 'Choose the employee to update:',
                choices: employeeChoices3,
              },
              {
                type: 'list',
                name: 'new_manager_id',
                message: 'Choose the new manager for the employee:',
                choices: employeeChoices3.concat([{ name: 'None', value: null }]),
              },
            ]);
            await db.updateEmployeeManager(emp_id, new_manager_id);
            console.log('Updated employee manager');
            break;
          case 'View Employees by Manager':
            const managersList = await db.viewAllManagers();
            const managerChoices = managersList.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
            const { manager_id } = await inquirer.prompt([
              {
                type: 'list',
                name: 'manager_id',
                message: 'Choose the manager to view employees:',
                choices: managerChoices,
              },
            ]);
            const employeesByManager = await db.viewEmployeesByManager(manager_id);
            console.table(employeesByManager);
            break;
          case 'View Employees by Department':
            const departmentsList2 = await db.viewAllDepartments();
            const departmentChoices2 = departmentsList2.map(({ id, name }) => ({
              name: name,
              value: id,
            }));
            const { viewDepartment_id } = await inquirer.prompt([
              {
                type: 'list',
                name: 'viewDepartment_id',
                message: 'Choose the department to view employees:',
                choices: departmentChoices2,
              },
            ]);
            const employeesByDepartment = await db.viewEmployeesByDepartment(viewDepartment_id);
            console.log(employeesByDepartment)
            console.table(employeesByDepartment);
            break;
          case 'Delete Department':
            const departmentsList3 = await db.viewAllDepartments();
  const departmentChoices3 = departmentsList3.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
            const { department_id_to_delete } = await inquirer.prompt([
              {
                type: 'list',
                name: 'department_id_to_delete',
                message: 'Choose the department to delete:',
                choices: departmentChoices3,
              },
            ]);
            const rolesInDepartment = await db.viewRolesByDepartment(department_id_to_delete);

  if (rolesInDepartment.length > 0) {
    console.log('There are roles associated with this department. Please delete or reassign them before deleting the department.');
  } else {
            await db.deleteDepartment(department_id_to_delete);
            console.log('Deleted department');
    }
            break;
            case 'Delete Role':
                const rolesListToDelete = await db.viewAllRoles();
                const roleChoicesToDelete = rolesListToDelete.map(({ id, title }) => ({
                  name: title,
                  value: id,
                }));
                const { role_id_to_delete } = await inquirer.prompt([
                  {
                    type: 'list',
                    name: 'role_id_to_delete',
                    message: 'Select the role you want to delete:',
                    choices: roleChoicesToDelete,
                  },
                ]);
                const employeesWithRole = await db.viewEmployeesByRole(role_id_to_delete);
                if (employeesWithRole.length > 0) {
                  console.log('Cannot delete this role because there are still employees with this role. Please reassign or delete those employees first.');
                } else {
                  await db.deleteRole(role_id_to_delete);
                  console.log('Role deleted successfully.');
                }
                break;
              
                case 'Delete Employee':
  const employeesList4 = await db.viewAllEmployees();
  const employeeChoicesDelete = employeesList4.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  const { employee_id_to_delete } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id_to_delete',
      message: 'Choose the employee to delete:',
      choices: employeeChoicesDelete,
    },
  ]);
  await db.deleteEmployee(employee_id_to_delete);
  console.log('Employee deleted successfully.');
  break;

                  
  case 'View Department Budget':
  const departmentsList4 = await db.viewAllDepartments();
  const departmentChoices4 = departmentsList4.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  
  const { department_id4 } = await inquirer.prompt([
    {
      type: 'list',
      name: 'department_id4',
      message: 'Choose the department to view budget:',
      choices: departmentChoices4,
    },
  ]);
  
  const departmentBudget = await db.viewDepartmentBudget(department_id4);
  
  if (departmentBudget) {
    console.table([
      {
        Department: departmentBudget.name,
        Budget: departmentBudget.utilized_budget,
      },
    ]);
  } else {
    console.log('No budget information available for this department.');
  }
  break;

  
          default:
            break;
        }
      }
    }
    
    // Initialize the application
    (async function () {
      await db.connect();
      await run();
      await db.close();
    })();  