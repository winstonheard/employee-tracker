const mysql = require('mysql2/promise');
const config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'grifter02.',
  database: 'company_db'
};

class DB {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    this.connection = await mysql.createConnection(this.config);
  }

  async close() {
    await this.connection.end();
  }

  async viewAllDepartments() {
    const [rows] = await this.connection.query('SELECT * FROM department');
    return rows;
  }

  async viewAllRoles() {
    const [rows] = await this.connection.query(`
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    return rows;
  }

  async viewAllEmployees() {
    const [rows] = await this.connection.query(`
      SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
      FROM employee e1
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      JOIN role ON e1.role_id = role.id
      JOIN department ON role.department_id = department.id
    `);
    return rows;
  }

  async viewAllManagers() {
    const [rows] = await this.connection.query(`
      SELECT id, first_name, last_name
      FROM employee
      WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)
    `);
    return rows;
  }
  

  async addDepartment(name) {
    const result = await this.connection.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result;
  }

  async addRole(title, salary, department_id) {
    const result = await this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    return result;
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    const result = await this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
    return result;
  }

  async updateEmployeeRole(employee_id, role_id) {
    const result = await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
    return result;
  }

  async updateEmployeeManager(employee_id, manager_id) {
    const result = await this.connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [manager_id, employee_id]);
    return result;
  }

  async viewEmployeesByManager(manager_id) {
    const [rows] = await this.connection.query(`
      SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary
      FROM employee e1
      JOIN role ON e1.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE e1.manager_id = ?
    `, [manager_id]);
    return rows;
  }

  async viewEmployeesByDepartment(department_id) {
    const [rows] = await this.connection.query(`
      SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary
      FROM employee e1
      JOIN role ON e1.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.id = ?
    `, [department_id]);
    return rows;
  }

  async viewEmployeesByRole(role_id) {
    const [rows] = await this.connection.query(`
      SELECT id, first_name, last_name
      FROM employee
      WHERE role_id = ?
    `, [role_id]);
    return rows;
  }
  

  async viewRolesByDepartment(department_id) {
    const [rows] = await this.connection.query('SELECT * FROM role WHERE department_id = ?', [department_id]);
    return rows;
  }
  

  async deleteDepartment(department_id) {
    const result = await this.connection.query('DELETE FROM department WHERE id = ?', [department_id]);
    return result;
  }

  async deleteRole(role_id) {
    const result = await this.connection.query('DELETE FROM role WHERE id = ?', [role_id]);
    return result;
  }

  async deleteEmployee(employee_id) {
    const result = await this.connection.query('DELETE FROM employee WHERE id = ?', [employee_id]);
    return result;
  }

  async viewDepartmentBudget(department_id) {
    const [rows] = await this.connection.query(`
      SELECT department.id, department.name, SUM(role.salary) AS utilized_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      WHERE department.id = ?
      GROUP BY department.id
    `, [department_id]);
    return rows[0];
  }
}



module.exports = new DB(config);
