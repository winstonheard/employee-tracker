const mysql = require('mysql2/promise');
const config = {
  host: 'localhost',
  user: 'root',
  password: 'grifter',
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
}

module.exports = new DB(config);
