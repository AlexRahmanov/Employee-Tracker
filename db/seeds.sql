/* insert info */
INSERT INTO department (dept_name)
VALUES 
('City Hall'),
('Budget and Finance'),
('City Planning');


INSERT INTO job (title, salary, department_id)
VALUES 
('Director', 100000, 1),
('Vice Director', 80000, 1),
('Assistant', 70000, 1),
('CEO Auditor', 90000, 2),
('Accountant', 75000, 2),
('Engineer', 65000, 3),
('Miniature Horse', 0, 1);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Bob', 'Handerson', 1, NULL),
('Jully', 'Castelia', 2, 1),
('Simon', 'Deluce', 3, 2),
('Adam', 'Terrner', 4, NULL),
('Luci', 'Brown', 5, 4),
('Chak', 'Shwartz', 6, NULL),
('Lesli', 'White', 7, NULL);