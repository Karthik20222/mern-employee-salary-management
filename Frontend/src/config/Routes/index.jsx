import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import {
  FormAddPosition,
  FormEditPosition,
  FormAddAttendance,
  FormEditAttendance,
  FormAddEmployee,
  FormEditEmployee,
  FormAddDeduction,
  FormEditDeduction,
  PrintPdfSalaryReport,
  SalaryDetail,
  PrintPdfPayslip,
  PrintPdfAttendanceReport,
  PrintPdfEmployeeSalary
} from '../../components';
import {
  EmployeeData,
  PositionData,
  AttendanceData,
  SalaryData,
  LaporanGaji,
  LaporanAbsensi,
  SlipGaji,
  UbahPasswordAdmin,
  EmployeeSalary,
  UbahPasswordPegawai,
  DeductionData,
  OvertimeData,
  Register
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Admin Data */}
      <Route
        path='/master-data/employees'
        element={<EmployeeData />}
      />
      <Route
        path='/master-data/employees/add'
        element={<FormAddEmployee />}
      />
      <Route
        path='/master-data/employees/edit/:id'
        element={<FormEditEmployee />}
      />
      <Route
        path='/master-data/positions'
        element={<PositionData />}
      />
      <Route
        path='/master-data/positions/add'
        element={<FormAddPosition />}
      />
      <Route
        path='/master-data/positions/edit/:id'
        element={<FormEditPosition />}
      />

      {/* Transaksi Admin */}
      <Route
        path='/transactions/attendance'
        element={<AttendanceData />}
      />
      <Route
        path='/transactions/attendance/add'
        element={<FormAddAttendance />}
      />
      <Route
        path='/transactions/attendance/edit/:id'
        element={<FormEditAttendance />}
      />
      <Route
        path='/transactions/salary-deductions'
        element={<DeductionData />}
      />
      <Route
        path='/transactions/overtime'
        element={<OvertimeData />}
      />
      <Route
        path='/transactions/salary-deductions/add'
        element={<FormAddDeduction />} />
      <Route
        path='/transactions/salary-deductions/edit/:id'
        element={<FormEditDeduction />} />
      <Route
        path='/transactions/salaries'
        element={<SalaryData />}
      />
      <Route
        path='/transactions/salaries/details/:name'
        element={<SalaryDetail />}
      />
      <Route
        path='/transactions/salaries/print-payslip/:name'
        element={<PrintPdfPayslip />}
      />

      {/* Laporan Admin */}
      <Route
        path='/reports/salary-reports'
        element={<LaporanGaji />}
      />
      <Route
        path='/reports/salary-reports/print'
        element={<PrintPdfSalaryReport />}
      />
      <Route
        path='/reports/attendance-reports'
        element={<LaporanAbsensi />}
      />
      <Route
        path='/reports/attendance-reports/print'
        element={<PrintPdfAttendanceReport />}
      />
      <Route
        path='/reports/payslips'
        element={<SlipGaji />}
      />
      <Route
        path='/reports/payslips/print'
        element={<PrintPdfPayslip />}
      />

      {/* Pengaturan Admin */}
      <Route
        path='/settings/change-password'
        element={<UbahPasswordAdmin />}
      />

      {/* Route Pegawai */}
      {/* Dashboard Employee Salary Data */}
      <Route
        path='/employee-salary'
        element={<EmployeeSalary />}
      />
      <Route
        path='/employee-salary/print'
        element={<PrintPdfEmployeeSalary />}
      />
      <Route
        path='/employee/change-password'
        element={<UbahPasswordPegawai />}
      />

      {/* Route Not Found 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default AppRoutes;
