import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Employee from './EmployeeModel.js';

const {DataTypes} = Sequelize;

const Position = db.define('positions',{
        position_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        position_name: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        base_salary: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        transport_allowance: {
            type: DataTypes.INTEGER(50),
            allowNull: false
        },
        meal_allowance: {
            type: DataTypes.INTEGER(50)
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        freezeTableName: true
});

Employee.hasMany(Position, { foreignKey: 'employee_id' });
Position.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Position;