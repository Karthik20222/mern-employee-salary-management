import Employee from "../models/EmployeeModel.js";
import Attendance from "../models/AttendanceModel.js";
import { getEmployeeSalaryData } from "./TransactionController.js";
import { verifyUser } from "../middleware/AuthUser.js";

// Employee dashboard
export const employeeDashboard = async (req, res) => {
    await verifyUser(req, res, () => {});

    const userId = req.userId;

    const response = await Employee.findOne({
      where:{
        id: userId
      },
      attributes: [
        'id', 'national_id', 'employee_name',
        'gender', 'position', 'hire_date',
        'employment_status', 'photo', 'role'
      ]
    });

    res.status(200).json(response);
  };

// Get employee salary by month
export const viewEmployeeSalaryByMonth = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await Employee.findOne({
    where:{
      id: userId
    }
  });

  try {
      const employeeSalaries = await getEmployeeSalaryData();

      const response = await Attendance.findOne({
          attributes: [
              'month'
          ],
          where: {
              month: req.params.month
          }
      });

      if (response) {
        const dataGajiByMonth = employeeSalaries.filter((data_gaji) => {
          return data_gaji.id === user.id && data_gaji.month === response.month;
        }).map((data_gaji) => {
          return {
            month: response.month,
            year: data_gaji.year,
            national_id: user.national_id,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            base_salary: data_gaji.base_salary,
            transport_allowance: data_gaji.transport_allowance,
            meal_allowance: data_gaji.meal_allowance,
            deduction: data_gaji.deduction,
            total_salary: data_gaji.total,
          };
        });
          return res.json(dataGajiByMonth);
      }

      res.status(404).json({ msg: `No salary data for month ${req.params.month} for employee ${user.employee_name}` });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee salary by year
export const viewEmployeeSalaryByYear = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await Employee.findOne({
    where:{
      id: userId
    }
  });

  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;

    const dataGajiByYear = employeeSalaries.filter((data_gaji) => {
      return data_gaji.id === user.id && data_gaji.year === parseInt(year);
    }).map((data_gaji) => {
        return {
            year: data_gaji.year,
            month: data_gaji.month,
            national_id: user.national_id,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            base_salary: data_gaji.base_salary,
            transport_allowance: data_gaji.transport_allowance,
            meal_allowance: data_gaji.meal_allowance,
            deduction: data_gaji.deduction,
            total_salary: data_gaji.total,
        };
    });

    if (dataGajiByYear.length === 0) {
        return res.status(404).json({ msg: `No data found for year ${year}` });
    }
    res.json(dataGajiByYear)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Data shown: month/year, base salary, transport allowance, meal allowance, deductions, total salary