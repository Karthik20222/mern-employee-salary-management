import Employee from './EmployeeModel.js';
import Position from './PositionModel.js';
import Attendance from './AttendanceModel.js';

/* Method for fetching employee data */

async function getEmployeeData() {
    try {
        const employees = await Employee.findAll();
        const employeeMap = new Map();
        employees.forEach(employee => {
            const { national_id, employee_name, position } = employee;
            employeeMap.set(employee_name, { national_id, position });
        });

        const resultEmployees = [];
        employeeMap.forEach(({ national_id, position }, employee_name) => {
            resultEmployees.push({ national_id, employee_name, position });
        });

        const employee_names = resultEmployees.map(employee => employee.employee_name);
        const national_ids = resultEmployees.map(employee => employee.national_id);
        const positions = resultEmployees.map(employee => employee.position);

        return { employee_names, national_ids, positions };
    } catch (error) {
        console.log(error);
    }
}

/* Method for fetching attendance data */

async function getAttendanceData() {
    try {
    const attendanceRecords = await Attendance.findAll();
    const attendanceMap = new Map();

    const { employee_names } = await getEmployeeData();
    const { national_ids } = await getEmployeeData();

    attendanceRecords.forEach(attendance => {
        const { national_id, month, gender, position_name, present_days, sick_days, absent_days } = attendance;
        const employee_name = employee_names.find(name => name === attendance.employee_name) || "-";
        const employee_national_id = national_ids.find(id => id === attendance.national_id) || "-";
        attendanceMap.set(employee_national_id, { employee_name, month, gender, position_name, present_days, sick_days, absent_days });
    });

    const resultAttendance = [];
    attendanceMap.forEach(({ national_id, month, gender, position_name, present_days, sick_days, absent_days }, employeeNationalId) => {
        const employee_name = employee_names.find(name => name === attendanceMap.get(employeeNationalId).employee_name) || "-";
        resultAttendance.push({ employee_name, national_id, month, gender, position_name, present_days, sick_days, absent_days });
    });

    console.log(resultAttendance);

    } catch (error) {
    console.log(error);
    }
}

getAttendanceData();



/* Method for fetching positions */

async function getPositions() {
    const positions = await Position.findAll();
    const positionMap = new Map();
    try {
        positions.forEach(position => {
            const { position_name, base_salary, transport_allowance, meal_allowance } = position;
            positionMap.set(position_name, { base_salary, transport_allowance, meal_allowance });
        });

        const resultPositions = [];
        positionMap.forEach(({ base_salary, transport_allowance, meal_allowance }, position_name) => {
            resultPositions.push({ position_name, base_salary, transport_allowance, meal_allowance });
        });

        return resultPositions;
    } catch (error) {
        console.log(error);
    }
}