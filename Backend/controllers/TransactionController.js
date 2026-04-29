import Attendance from "../models/AttendanceModel.js";
import Employee from "../models/EmployeeModel.js";
import Position from "../models/PositionModel.js";
import SalaryDeduction from "../models/SalaryDeductionModel.js";
import moment from "moment";

// Get all attendance records
export const viewAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({}, 'month national_id employee_name gender position_name present_days sick_days absent_days createdAt');
    
    const attendanceResults = attendanceRecords.map((attendance) => {
      const createdAt = new Date(attendance.createdAt);
      return {
        id: attendance._id,
        month: attendance.month,
        year: createdAt.getFullYear(),
        national_id: attendance.national_id,
        employee_name: attendance.employee_name,
        position_name: attendance.position_name,
        gender: attendance.gender,
        present_days: attendance.present_days,
        sick_days: attendance.sick_days,
        absent_days: attendance.absent_days,
      };
    });
    res.json(attendanceResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get attendance by ID
export const viewAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create attendance record
export const createAttendance = async (req, res) => {
  const {
    national_id,
    employee_name,
    position_name,
    gender,
    present_days,
    sick_days,
    absent_days,
  } = req.body;

  try {
    const employeeData = await Employee.findOne({ employee_name });
    const positionData = await Position.findOne({ position_name });
    const nationalIdData = await Employee.findOne({ national_id });
    const employeeNameExists = await Attendance.findOne({ employee_name });

    if (!employeeData) return res.status(404).json({ msg: "Employee name not found" });
    if (!positionData) return res.status(404).json({ msg: "Position name not found" });
    if (!nationalIdData) return res.status(404).json({ msg: "National ID not found" });

    if (!employeeNameExists) {
      const month = moment().locale("en").format("MMMM").toLowerCase();
      await Attendance.create({
        month,
        national_id,
        employee_name: employeeData.employee_name,
        gender,
        position_name: positionData.position_name,
        present_days,
        sick_days,
        absent_days,
      });
      res.json({ msg: "Attendance record added" });
    } else {
      res.status(400).json({ msg: "Employee name already exists" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update attendance record
export const updateAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Attendance updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete attendance record
export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create salary deduction
export const createSalaryDeduction = async (req, res) => {
  const { deduction_name, deduction_amount } = req.body;
  try {
    const existingDeduction = await SalaryDeduction.findOne({ deduction_name });
    if (existingDeduction) {
      res.status(400).json({ msg: "Deduction already exists" });
    } else {
      await SalaryDeduction.create({
        deduction_name,
        deduction_amount: deduction_amount.toString(),
      });
      res.json({ msg: "Salary deduction added" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all salary deductions
export const viewSalaryDeductions = async (req, res) => {
  try {
    const deductionData = await SalaryDeduction.find({}, 'deduction_name deduction_amount');
    res.json(deductionData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get salary deduction by ID
export const viewSalaryDeductionById = async (req, res) => {
  try {
    const deductionData = await SalaryDeduction.findById(req.params.id);
    res.json(deductionData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update salary deduction
export const updateSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Salary deduction updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete salary deduction
export const deleteSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Salary deduction deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Helper methods for calculations
export const getEmployeeData = async () => {
  try {
    const employees = await Employee.find({}, 'national_id employee_name gender position');
    return employees.map(e => ({
      id: e._id,
      national_id: e.national_id,
      employee_name: e.employee_name,
      gender: e.gender,
      employeePosition: e.position
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPositionData = async () => {
  try {
    const positions = await Position.find({}, 'position_name base_salary transport_allowance meal_allowance');
    return positions.map(p => ({
      position_name: p.position_name,
      base_salary: p.base_salary,
      transport_allowance: p.transport_allowance,
      meal_allowance: p.meal_allowance
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAttendanceData = async () => {
  try {
    const records = await Attendance.find();
    return records.map(a => {
      const createdAt = new Date(a.createdAt);
      return {
        month: a.month,
        year: createdAt.getFullYear(),
        national_id: a.national_id,
        employee_name: a.employee_name,
        position_name: a.position_name,
        present_days: a.present_days,
        sick_days: a.sick_days,
        absent_days: a.absent_days,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSalaryDeductionData = async () => {
  try {
    const deductions = await SalaryDeduction.find();
    return deductions.map(d => ({
      id: d._id,
      deduction_name: d.deduction_name,
      deduction_amount: parseInt(d.deduction_amount.replace(/,/g, ''))
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Salary calculations
export const getEmployeeSalaryData = async () => {
  try {
    const employeeResults = await getEmployeeData();
    const positionResults = await getPositionData();
    const attendanceResults = await getAttendanceData();
    const deductionResults = await getSalaryDeductionData();

    const employeeSalaries = employeeResults
      .filter((employee) =>
        positionResults.some(
          (position) => position.position_name === employee.employeePosition
        )
      )
      .map((employee) => {
        const position = positionResults.find(
          (position) => position.position_name === employee.employeePosition
        );
        return {
          id: employee.id,
          national_id: employee.national_id,
          employee_name: employee.employee_name,
          position: employee.employeePosition,
          base_salary: position.base_salary,
          transport_allowance: position.transport_allowance,
          meal_allowance: position.meal_allowance,
        };
      });

    const employeeDeductions = attendanceResults.map((attendance) => {
      const absentDeduction = attendance.absent_days > 0 ?
        deductionResults
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "absent")
          .reduce((total, deduction) => total + deduction.deduction_amount * attendance.absent_days, 0) : 0;

      const sickDeduction = attendance.sick_days > 0 ?
        deductionResults
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "sick")
          .reduce((total, deduction) => total + deduction.deduction_amount * attendance.sick_days, 0) : 0;

      return {
        year: attendance.year,
        month: attendance.month,
        employee_name: attendance.employee_name,
        present_days: attendance.present_days,
        sick_days: attendance.sick_days,
        absent_days: attendance.absent_days,
        sick_deduction: sickDeduction,
        absent_deduction: absentDeduction,
        total_deduction: sickDeduction + absentDeduction
      };
    });

    return employeeSalaries.map((employee) => {
      const attendance = attendanceResults.find(
        (item) => item.employee_name === employee.employee_name
      );
      const deduction = employeeDeductions.find(
        (item) => item.employee_name === employee.employee_name
      );
      
      const total_salary = (employee.base_salary +
      employee.transport_allowance +
      employee.meal_allowance -
      (deduction ? deduction.total_deduction : 0));

      return {
        year: deduction ? deduction.year : (attendance ? attendance.year : 0),
        month: deduction ? deduction.month : (attendance ? attendance.month : 0),
        id: employee.id,
        national_id: employee.national_id,
        employee_name: employee.employee_name,
        position: employee.position,
        base_salary: employee.base_salary.toLocaleString(),
        transport_allowance: employee.transport_allowance.toLocaleString(),
        meal_allowance: employee.meal_allowance.toLocaleString(),
        present_days: attendance ? attendance.present_days : 0,
        sick_days: attendance ? attendance.sick_days : 0,
        absent_days: attendance ? attendance.absent_days : 0,
        deduction: deduction ? deduction.total_deduction.toLocaleString() : "0",
        total: total_salary.toLocaleString(),
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const viewEmployeeSalaries = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    res.status(200).json(employeeSalaries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewEmployeeSalaryByName = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { name } = req.params;

    const salaryDataByName = employeeSalaries
      .filter((salaryData) => {
        return salaryData.employee_name
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      });

    if (salaryDataByName.length === 0) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    return res.json(salaryDataByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewEmployeeSalaryById = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const foundData = employeeSalaries.find((data) => data.id.toString() === req.params.id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const viewEmployeeSalariesByMonth = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const salaryDataByMonth = employeeSalaries.filter(s => s.month === req.params.month);

    if (salaryDataByMonth.length > 0) {
      return res.json(salaryDataByMonth);
    }
    res.status(404).json({ msg: `No data found for month ${req.params.month}` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewEmployeeSalariesByYear = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaries.filter(s => s.year === parseInt(year));

    if (salaryDataByYear.length === 0) {
      return res.status(404).json({ msg: `No data found for year ${year}` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const salaryReportByYear = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;
    const salaryDataByYear = employeeSalaries.filter(s => s.year === parseInt(year));

    if (salaryDataByYear.length === 0) {
      return res.status(404).json({ msg: `No data found for year ${year}` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};