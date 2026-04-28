import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import employeeSalaryPrintReducer from './reducer/employeeSalaryPrintReducer';
import employeeReducer from './reducer/employeeReducer';
import positionReducer from './reducer/positionReducer';
import attendanceReducer from './reducer/attendanceReducer';
import deductionReducer from './reducer/deductionReducer';
import salaryReducer from './reducer/salaryReducer';
import attendanceReportReducer from './reducer/attendanceReportReducer';
import salaryReportReducer from './reducer/salaryReportReducer';
import payslipReducer from './reducer/payslipReducer';
import changePasswordReducer from './reducer/changePasswordReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
            employeeSalaryPrint: employeeSalaryPrintReducer,
            employee: employeeReducer,
            position: positionReducer,
            attendance: attendanceReducer,
            deduction: deductionReducer,
            salary: salaryReducer,
            attendanceReport: attendanceReportReducer,
            salaryReport: salaryReportReducer,
            payslip: payslipReducer,
            changePassword: changePasswordReducer,
    },
});

export default store;
