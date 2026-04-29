import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Overtime = db.define('overtime_entries', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    overtime_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    overtime_hours: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved'),
        allowNull: false,
        defaultValue: 'pending',
    },
    approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    freezeTableName: true,
});

export default Overtime;