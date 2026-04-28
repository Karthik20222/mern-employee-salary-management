import {
    getEmployeeSalaryData,
    getAttendanceData,
    viewEmployeeSalariesByYear
} from "./TransactionController.js"

// Get employee salary report
export const viewEmployeeSalaryReport = async(req, res) => {
    try {
        const salaryReport = await getEmployeeSalaryData(req, res);
        res.status(200).json(salaryReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get employee salary report by month
export const viewEmployeeSalaryReportByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataLaporanGajiByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = dataLaporanGajiByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    employee_name: data.employee_name,
                    position: data.position,
                    base_salary: data.base_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// Get employee salary report by year
export const viewEmployeeSalaryReportByYear = async (req, res) => {
    try {
         await viewEmployeeSalariesByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get employee salary report by name
export const viewEmployeeSalaryReportByName = async (req, res) => {
    try {
                const salaryEmployeeData = await getEmployeeSalaryData(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = salaryEmployeeData.filter((data) => {
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

// Get attendance report by month
export const viewAttendanceReportByMonth = async (req, res) => {
    try {
        const dataAbsensiByMonth = await getAttendanceData();
        const { month } = req.params;

        const dataAbsensi = dataAbsensiByMonth.filter((absensi) => absensi.month.toLowerCase() === month.toLowerCase()).map((absensi) => {
            return {
                year: absensi.year,
                month: absensi.month,
                national_id: absensi.national_id,
                employee_name: absensi.employee_name,
                position_name: absensi.position_name,
                present_days: absensi.present_days,
                sick_days: absensi.sick_days,
                absent_days: absensi.absent_days
            };
        });

        if (dataAbsensi.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(dataAbsensi);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// Get attendance report by year
export const viewAttendanceReportByYear = async (req, res) => {
    try {
        const dataAbsensiByYear = await getAttendanceData();
        const { year } = req.params;

        const dataAbsensi = dataAbsensiByYear.filter((absensi) => absensi.year.toString() === year.toString()).map((absensi) => {
            return {
                year: absensi.year,
                month: absensi.month,
                national_id: absensi.national_id,
                employee_name: absensi.employee_name,
                position_name: absensi.position_name,
                present_days: absensi.present_days,
                sick_days: absensi.sick_days,
                absent_days: absensi.absent_days
            };
        });

        if (dataAbsensi.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(dataAbsensi);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// Get payslip by employee name
export const viewPayslipByName = async (req, res) => {
    try {
                const salaryEmployeeData = await getEmployeeSalaryData(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = salaryEmployeeData.filter((data) => {
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
}

// Get payslip by month
export const viewPayslipByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataLaporanGajiByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = dataLaporanGajiByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `No data found for month ${month}` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    year: data.year,
                    employee_name: data.employee_name,
                    position: data.position,
                    base_salary: data.base_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get payslip by year
export const viewPayslipByYear = async (req, res) => {
    try {
        await viewEmployeeSalariesByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}