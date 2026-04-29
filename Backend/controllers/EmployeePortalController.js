import Employee from "../models/EmployeeModel.js";
import Attendance from "../models/AttendanceModel.js";
import { getEmployeeSalaryData } from "./TransactionController.js";

// Employee dashboard
export const employeeDashboard = async (req, res) => {
    const userId = req.userId;

    try {
        const response = await Employee.findById(userId, 'national_id employee_name gender position hire_date employment_status photo role');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get employee salary by month
export const viewEmployeeSalaryByMonth = async (req, res) => {
  const userId = req.userId;
  
  try {
      const user = await Employee.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const employeeSalaries = await getEmployeeSalaryData();

      const attendance = await Attendance.findOne({
          month: req.params.month
      });

      if (attendance) {
        const salaryDataByMonth = employeeSalaries.filter((salaryData) => {
          return salaryData.id.toString() === user._id.toString() && salaryData.month === attendance.month;
        }).map((salaryData) => {
          return {
            month: attendance.month,
            year: salaryData.year,
            national_id: user.national_id,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            base_salary: salaryData.base_salary,
            transport_allowance: salaryData.transport_allowance,
            meal_allowance: salaryData.meal_allowance,
            deduction: salaryData.deduction,
            total_salary: salaryData.total,
          };
        });
          return res.json(salaryDataByMonth);
      }

      res.status(404).json({ msg: `No salary data for month ${req.params.month} for employee ${user.employee_name}` });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee salary by year
export const viewEmployeeSalaryByYear = async (req, res) => {
  const userId = req.userId;
  
  try {
    const user = await Employee.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaries.filter((salaryData) => {
      return salaryData.id.toString() === user._id.toString() && salaryData.year === parseInt(year);
    }).map((salaryData) => {
        return {
            year: salaryData.year,
            month: salaryData.month,
            national_id: user.national_id,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            base_salary: salaryData.base_salary,
            transport_allowance: salaryData.transport_allowance,
            meal_allowance: salaryData.meal_allowance,
            deduction: salaryData.deduction,
            total_salary: salaryData.total,
        };
    });

    if (salaryDataByYear.length === 0) {
        return res.status(404).json({ msg: `No data found for year ${year}` });
    }
    res.json(salaryDataByYear)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}