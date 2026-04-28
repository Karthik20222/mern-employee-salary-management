import { Sequelize } from 'sequelize';

const db = new Sequelize('employee_payroll_system', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;