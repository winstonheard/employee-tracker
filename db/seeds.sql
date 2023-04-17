USE company_db;

INSERT INTO department (name)
VALUES
  ('Human Resources'),
  ('Engineering'),
  ('Sales'),
  ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
  ('HR Manager', 70000, 1),
  ('HR Specialist', 50000, 1),
  ('Software Engineer', 85000, 2),
  ('Project Manager', 90000, 2),
  ('Sales Manager', 75000, 3),
  ('Sales Representative', 60000, 3),
  ('Marketing Manager', 80000, 4),
  ('Marketing Specialist', 55000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, NULL),
  ('Emily', 'Brown', 4, 3),
  ('Sarah', 'Davis', 5, NULL),
  ('William', 'Martinez', 6, 5),
  ('David', 'Garcia', 7, NULL),
  ('Elizabeth', 'Rodriguez', 8, 7);
