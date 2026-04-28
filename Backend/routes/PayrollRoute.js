import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByNationalId,
    getEmployeeByName,
} from '../controllers/EmployeeController.js';

import {
    getPositions,
    createPosition,
    updatePosition,
    deletePosition,
    getPositionById
} from "../controllers/PositionController.js";

import {
    viewAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    viewAttendanceById,
    viewEmployeeSalaryByName,
} from "../controllers/TransactionController.js";

import {
    createSalaryDeduction,
    deleteSalaryDeduction,
    viewSalaryDeductionById,
    updateSalaryDeduction,
    viewSalaryDeductions
} from "../controllers/TransactionController.js";

import {
    viewEmployeeSalaries,
    viewEmployeeSalariesByMonth,
    viewEmployeeSalariesByYear
} from "../controllers/TransactionController.js";

import {
    viewAttendanceReportByMonth,
    viewAttendanceReportByYear,
    viewEmployeeSalaryReport,
    viewEmployeeSalaryReportByMonth,
    viewEmployeeSalaryReportByName,
    viewEmployeeSalaryReportByYear,
    viewPayslipByMonth,
    viewPayslipByName,
    viewPayslipByYear,
} from "../controllers/ReportController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import {
    employeeDashboard,
    viewEmployeeSalaryByMonth,
    viewEmployeeSalaryByYear
} from '../controllers/EmployeePortalController.js';

const router = express.Router();

// Admin Route :

/* ==== Master Data ==== */
// Employees
router.get('/employees', verifyUser, adminOnly, getEmployees);
router.get('/employees/id/:id', verifyUser, adminOnly, getEmployeeById);
router.get('/employees/national-id/:nationalId', verifyUser, adminOnly, getEmployeeByNationalId);
router.get('/employees/name/:name', verifyUser, getEmployeeByName);
router.post('/employees',verifyUser, adminOnly, createEmployee);
router.patch('/employees/:id', verifyUser, adminOnly, updateEmployee);
router.delete('/employees/:id', verifyUser, adminOnly, deleteEmployee);
router.patch('/employees/:id/change-password', verifyUser, adminOnly, changePassword);
// Positions
router.get('/positions', verifyUser, adminOnly, getPositions);
router.get('/positions/:id', verifyUser, adminOnly, getPositionById);
router.post('/positions', verifyUser, adminOnly, createPosition);
router.patch('/positions/:id', verifyUser, adminOnly, updatePosition);
router.delete('/positions/:id', verifyUser, adminOnly, deletePosition);

/* ==== Transactions  ==== */
// Attendance
router.get('/attendance', verifyUser, adminOnly, viewAttendance);
router.get('/attendance/:id', verifyUser, adminOnly, viewAttendanceById);
router.post('/attendance',verifyUser, adminOnly, createAttendance);
router.patch('/attendance/update/:id',verifyUser, adminOnly, updateAttendance);
router.delete('/attendance/:id', verifyUser, adminOnly, deleteAttendance);
// Salary Deductions
router.get('/salary_deductions', adminOnly, verifyUser, viewSalaryDeductions);
router.get('/salary_deductions/:id', adminOnly, verifyUser, viewSalaryDeductionById);
router.post('/salary_deductions', adminOnly, verifyUser, createSalaryDeduction);
router.patch('/salary_deductions/update/:id', adminOnly, verifyUser, updateSalaryDeduction);
router.delete('/salary_deductions/:id', adminOnly, verifyUser, deleteSalaryDeduction);
// Employee Salaries
router.get('/employee_salaries', viewEmployeeSalaries);
router.get('/employee_salaries/name/:name', verifyUser, viewEmployeeSalaryByName);
router.get('/employee_salaries/month/:month', viewEmployeeSalariesByMonth);
router.get('/employee_salaries/year/:year', viewEmployeeSalariesByYear);

/* ====  Reports  ==== */
// Salary Reports
router.get('/reports/salary',verifyUser, adminOnly, viewEmployeeSalaryReport);
router.get('/reports/salary/name/:name',verifyUser, adminOnly, viewEmployeeSalaryReportByName);
router.get('/reports/salary/month/:month', verifyUser, adminOnly,viewEmployeeSalaryReportByMonth);
router.get('/reports/salary/year/:year', verifyUser, adminOnly,viewEmployeeSalaryReportByYear);
// Attendance Reports
router.get('/reports/attendance/month/:month', verifyUser, adminOnly,viewAttendanceReportByMonth);
router.get('/reports/attendance/year/:year', verifyUser, adminOnly,viewAttendanceReportByYear);
// Payslips
router.get('/reports/payslips/name/:name', verifyUser, adminOnly,viewPayslipByName);
router.get('/reports/payslips/month/:month',verifyUser, adminOnly, viewPayslipByMonth);
router.get('/reports/payslips/year/:year',verifyUser, adminOnly, viewPayslipByYear);

/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);

// Employee Routes:
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, employeeDashboard);
/* ==== Salary Data ==== */
router.get('/salary/month/:month', verifyUser, viewEmployeeSalaryByMonth);
router.get('/salary/year/:year', verifyUser, viewEmployeeSalaryByYear);
/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;