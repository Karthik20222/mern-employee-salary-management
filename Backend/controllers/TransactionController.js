import Attendance from "../models/AttendanceModel.js";
import Employee from "../models/EmployeeModel.js";
import Position from "../models/PositionModel.js";
import SalaryDeduction from "../models/SalaryDeductionModel.js";
import moment from "moment";
import "moment/locale/en.js";

// Get all attendance records
export const viewAttendance = async (req, res) => {
  let resultAttendance = [];
  try {
    // Get attendance data
    const attendanceRecords = await Attendance.findAll({
      attributes: [
        "id",
        "month",
        "national_id",
        "employee_name",
        "gender",
        "position_name",
        "present_days",
        "sick_days",
        "absent_days",
        "createdAt",
      ],
      distinct: true,
    });

    resultAttendance = attendanceRecords.map((attendance) => {
      const id = attendance.id;
      const createdAt = new Date(attendance.createdAt);
      const year = createdAt.getFullYear();
      const bulan = attendance.month;
      const national_id = attendance.national_id;
      const employee_name = attendance.employee_name;
      const position_name = attendance.position_name;
      const gender = attendance.gender;
      const present_days = attendance.present_days;
      const sick_days = attendance.sick_days;
      const absent_days = attendance.absent_days;

      return {
        id,
        month: bulan,
        year,
        national_id,
        employee_name,
        position_name,
        gender,
        present_days,
        sick_days,
        absent_days,
      };
    });
    res.json(resultAttendance);
  } catch (error) {
    console.log(error);
  }
};

// Get attendance by ID
export const viewAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      attributes: [
        "id",
        "month",
        "national_id",
        "employee_name",
        "gender",
        "position_name",
        "present_days",
        "sick_days",
        "absent_days",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
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
    const data_employee_name = await Employee.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    const data_position_name = await Position.findOne({
      where: {
        position_name: position_name,
      },
    });

    const data_national_id = await Employee.findOne({
      where: {
        national_id: national_id,
      },
    });

    const nameAlreadyExists = await Attendance.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    if (!data_employee_name) {
      return res.status(404).json({ msg: "Employee name not found" });
    }

    if (!data_position_name) {
      return res.status(404).json({ msg: "Position name not found" });
    }

    if (!data_national_id) {
      return res.status(404).json({ msg: "National ID not found" });
    }

    if (!nameAlreadyExists) {
      const month = moment().locale("en").format("MMMM");
      await Attendance.create({
        month: month.toLowerCase(),
        national_id: national_id,
        employee_name: data_employee_name.employee_name,
        gender: gender,
        position_name: data_position_name.position_name,
        present_days: present_days,
        sick_days: sick_days,
        absent_days: absent_days,
      });
      res.json({ msg: "Attendance record added" });
    } else {
      res.status(400).json({ msg: "Employee name already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Update attendance record
export const updateAttendance = async (req, res) => {
  try {
    await Attendance.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance updated" });
  } catch (error) {
    console.log(error.msg);
  }
};

// Delete attendance record
export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance deleted" });
  } catch (error) {
    console.log(error.msg);
  }
};

// Create salary deduction
export const createSalaryDeduction = async (req, res) => {
  const { id, deduction_name, deduction_amount } = req.body;
  try {
    const existingDeduction = await SalaryDeduction.findOne({
      where: {
        deduction_name: deduction_name,
      },
    });
    if (existingDeduction) {
      res.status(400).json({ msg: "Deduction already exists" });
    } else {
      await SalaryDeduction.create({
        id: id,
        deduction_name: deduction_name,
        deduction_amount: deduction_amount.toLocaleString(),
      });
      res.json({ msg: "Salary deduction added" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get all salary deductions
export const viewSalaryDeductions = async (req, res) => {
  try {
    const dataPotongan = await SalaryDeduction.findAll({
      attributes: ["id", "deduction_name", "deduction_amount"],
    });
    res.json(dataPotongan);
  } catch (error) {
    console.log(error);
  }
};

// Get salary deduction by ID
export const viewSalaryDeductionById = async (req, res) => {
  try {
    const dataPotongan = await SalaryDeduction.findOne({
      attributes: ["id", "deduction_name", "deduction_amount"],
      where: {
        id: req.params.id,
      },
    });
    res.json(dataPotongan);
  } catch (error) {
    console.log(error);
  }
};

// Update salary deduction
export const updateSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Salary deduction updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete salary deduction
export const deleteSalaryDeduction = async (req, res) => {
  try {
    await SalaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Salary deduction deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

// Build employee salary data from employees, positions, attendance, and deductions

// Get employee data
export const getEmployeeData = async () => {
  let resultEmployees = [];

  try {
    // Get employees
    const employees = await Employee.findAll({
      attributes: ["id", "national_id", "employee_name", "gender", "position"],
      distinct: true,
    });

    resultEmployees = employees.map((employee) => {
      const id = employee.id;
      const national_id = employee.national_id;
      const employee_name = employee.employee_name;
      const gender = employee.gender;
      const employee_position = employee.position;

      return { id, national_id, employee_name, gender, employee_position };
    });
  } catch (error) {
    console.error(error);
  }

  return resultEmployees;
};

// Get position data
export const getPositionData = async () => {
  let resultPositions = [];
  try {
    const positions = await Position.findAll({
      attributes: ["position_name", "base_salary", "transport_allowance", "meal_allowance"],
      distinct: true,
    });

    resultPositions = positions.map((position) => {
      const position_name = position.position_name;
      const base_salary = position.base_salary;
      const transport_allowance = position.transport_allowance;
      const meal_allowance = position.meal_allowance;

      return { position_name, base_salary, transport_allowance, meal_allowance };
    });
  } catch (error) {
    console.error(error);
  }
  return resultPositions;
};

// Get attendance data
export const getAttendanceData = async () => {
  try {
    const attendanceRecords = await Attendance.findAll({
      attributes: [
        "month",
        "national_id",
        "employee_name",
        "gender",
        "position_name",
        "present_days",
        "sick_days",
        "absent_days",
        "createdAt",
      ],
      distinct: true,
    });

    const resultAttendance = attendanceRecords.map((attendance) => {
      const createdAt = new Date(attendance.createdAt);
      const tahun = createdAt.getFullYear();
      const bulan = attendance.month;
      const national_id = attendance.national_id;
      const employee_name = attendance.employee_name;
      const position_name = attendance.position_name;
      const present_days = attendance.present_days;
      const sick_days = attendance.sick_days;
      const absent_days = attendance.absent_days;

      return {
        month: bulan,
        tahun,
        national_id,
        employee_name,
        position_name,
        present_days,
        sick_days,
        absent_days,
      };
    });
    return resultAttendance;
  } catch (error) {
    console.error(error);
  }
};

export const getSalaryDeductionData = async () => {
  let resultDeductions = [];
  try {
    const deductions = await SalaryDeduction.findAll({
      attributes: ["id", "deduction_name", "deduction_amount"],
      distinct: true,
    });
    resultDeductions = deductions.map((deduction) => {
      const id = deduction.id;
      const deduction_name = deduction.deduction_name;
      const deduction_amount = deduction.deduction_amount;

      return { id, deduction_name, deduction_amount };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDeductions;
};

// Salary calculations
export const getEmployeeSalaryData = async () => {
  try {
    const resultEmployees = await getEmployeeData();
    const resultPositions = await getPositionData();

    const employeeSalaries = resultEmployees
      .filter((employee) =>
        resultPositions.some(
          (position) => position.position_name === employee.employee_position
        )
      )
      .map((employee) => {
        const position = resultPositions.find(
          (position) => position.position_name === employee.employee_position
        );
        return {
          id: employee.id,
          national_id: employee.national_id,
          employee_name: employee.employee_name,
          position: employee.employee_position,
          base_salary: position.base_salary,
          transport_allowance: position.transport_allowance,
          meal_allowance: position.meal_allowance,
        };
      });

    const resultAttendance = await getAttendanceData();
    const resultDeductions = await getSalaryDeductionData();

    const employeeDeductions = resultAttendance.map((attendance) => {
      const alphaDeduction = attendance.absent_days > 0 ?
        resultDeductions
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "absent")
          .reduce((total, deduction) => total + deduction.deduction_amount * attendance.absent_days, 0) : 0;

      const sickDeduction = attendance.sick_days > 0 ?
        resultDeductions
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
        absent_deduction: alphaDeduction,
        total_deduction: sickDeduction + alphaDeduction
      };
    });

    const totalEmployeeSalaries = employeeSalaries.map((employee) => {
      const id = employee.id;
      const attendance = resultAttendance.find(
        (item) => item.employee_name === employee.employee_name
      );
      const deduction = employeeDeductions.find(
        (item) => item.employee_name === employee.employee_name
      );
      const total_salary =
      (employee.base_salary +
      employee.transport_allowance +
      employee.meal_allowance -
      (deduction ? deduction.total_deduction : 0)).toLocaleString();

      return {
        year: deduction ? deduction.year : attendance ? attendance.year : 0,
        month: deduction ? deduction.month : attendance ? attendance.month : 0,
        id: id,
        national_id: employee.national_id,
        employee_name: employee.employee_name,
        position: employee.position,
        base_salary: employee.base_salary.toLocaleString(),
        transport_allowance: employee.transport_allowance.toLocaleString(),
        meal_allowance: employee.meal_allowance.toLocaleString(),
        present_days: attendance.present_days,
        sick_days: attendance.sick_days,
        absent_days: attendance.absent_days,
        deduction: deduction ? deduction.total_deduction.toLocaleString() : 0,
        total: total_salary,
      };
    });
    return totalEmployeeSalaries;
  } catch (error) {
    console.error(error);
  }
};

// Get employee salary data
export const viewEmployeeSalaries = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    res.status(200).json(employeeSalaries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewEmployeeSalariesByName = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { name } = req.params;

    const dataGajiByName = employeeSalaries
      .filter((data_gaji) => {
        return data_gaji.employee_name
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((data_gaji) => {
        return {
          year: data_gaji.year,
          month: data_gaji.month,
          id: data_gaji.id,
          national_id: data_gaji.national_id,
          employee_name: data_gaji.employee_name,
          position: data_gaji.position,
          gender: data_gaji.gender,
          position_name: data_gaji.position_name,
          base_salary: data_gaji.base_salary,
          transport_allowance: data_gaji.transport_allowance,
          meal_allowance: data_gaji.meal_allowance,
          deduction: data_gaji.deduction,
          total_salary: data_gaji.total,
        };
      });

    if (dataGajiByName.length === 0) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    return res.json(dataGajiByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get employee salary by ID
export const viewEmployeeSalaryById = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData(req, res);
    const id = parseInt(req.params.id);

    const foundData = employeeSalaries.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get employee salary by name
export const viewEmployeeSalaryByName = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData(req, res);
    const name = req.params.name.toLowerCase();

    const foundData = employeeSalaries.filter((data) => {
      const formattedName = data.employee_name.toLowerCase();
      const searchKeywords = name.split(" ");

      return searchKeywords.every((keyword) => formattedName.includes(keyword));
    });

    if (foundData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



// Get employee salaries by month
export const viewEmployeeSalariesByMonth = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const response = await Attendance.findOne({
      attributes: ["month"],
      where: {
        month: req.params.month,
      },
    });

    if (response) {
      const dataGajiByMonth = employeeSalaries
        .filter((data_gaji) => {
          return data_gaji.month === response.month;
        })
        .map((data_gaji) => {
          return {
            month: response.month,
            id: data_gaji.id,
            national_id: data_gaji.national_id,
            employee_name: data_gaji.employee_name,
            gender: data_gaji.gender,
            position_name: data_gaji.position_name,
            base_salary: data_gaji.base_salary,
            transport_allowance: data_gaji.transport_allowance,
            meal_allowance: data_gaji.meal_allowance,
            deduction: data_gaji.deduction,
            total_salary: data_gaji.total,
          };
        });
      return res.json(dataGajiByMonth);
    }

    res
      .status(404)
      .json({ msg: `No data found for month ${req.params.month}` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get employee salaries by year
export const viewEmployeeSalariesByYear = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;

    const dataGajiByYear = employeeSalaries
      .filter((data_gaji) => {
        const gajiYear = data_gaji.year;
        return gajiYear === parseInt(year);
      })
      .map((data_gaji) => {
        return {
          year: data_gaji.year,
          id: data_gaji.id,
          national_id: data_gaji.national_id,
          employee_name: data_gaji.employee_name,
          gender: data_gaji.gender,
          position_name: data_gaji.position,
          present_days: data_gaji.present_days,
          sick_days: data_gaji.sick_days,
          absent_days: data_gaji.absent_days,
          base_salary: data_gaji.base_salary,
          transport_allowance: data_gaji.transport_allowance,
          meal_allowance: data_gaji.meal_allowance,
          deduction: data_gaji.deduction,
          total_salary: data_gaji.total,
        };
      });

    if (dataGajiByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `No data found for year ${year}` });
    }
    res.json(dataGajiByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Build salary report by year
export const salaryReportByYear = async (req, res) => {
  try {
    const employeeSalaries = await getEmployeeSalaryData();
    const { year } = req.params;

    const dataGajiByYear = employeeSalaries
      .filter((data_gaji) => {
        const gajiYear = data_gaji.year;
        return gajiYear === parseInt(year);
      })
      .map((data_gaji) => {
        return {
          year: data_gaji.year,
          id: data_gaji.id,
          national_id: data_gaji.national_id,
          employee_name: data_gaji.employee_name,
          gender: data_gaji.gender,
          position_name: data_gaji.position_name,
          base_salary: data_gaji.base_salary,
          transport_allowance: data_gaji.transport_allowance,
          meal_allowance: data_gaji.meal_allowance,
          deduction: data_gaji.deduction,
          total_salary: data_gaji.total,
        };
      });

    if (dataGajiByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `No data found for year ${year}` });
    } else {
      const laporanByYear = dataGajiByYear.map((data) => data.year)
      console.log(laporanByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};