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
  PrintPdfLaporanGaji,
  SalaryDetail,
  PrintPdfPayslip,
  PrintPdfAttendanceReport,
  PrintPdfDataGajiPegawai
} from '../../components';
import {
  DataPegawai,
  DataJabatan,
  DataKehadiran,
  DataGaji,
  LaporanGaji,
  LaporanAbsensi,
  SlipGaji,
  UbahPasswordAdmin,
  DataGajiPegawai,
  UbahPasswordPegawai,
  DataPotongan
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tentang' element={<About />} />
      <Route path='/kontak' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route
        path='/data-pegawai'
        element={<DataPegawai />}
      />
      <Route
        path='/data-pegawai/form-data-pegawai/add'
        element={<FormAddEmployee />}
      />
      <Route
        path='/data-pegawai/form-data-pegawai/edit/:id'
        element={<FormEditEmployee />}
      />
      <Route
        path='/data-jabatan'
        element={<DataJabatan />}
      />
      <Route
        path='/data-jabatan/form-data-jabatan/add'
        element={<FormAddPosition />}
      />
      <Route
        path='/data-jabatan/form-data-jabatan/edit/:id'
        element={<FormEditPosition />}
      />

      {/* Transaksi Admin */}
      <Route
        path='/data-kehadiran'
        element={<DataKehadiran />}
      />
      <Route
        path='/data-kehadiran/form-data-kehadiran/add'
        element={<FormAddAttendance />}
      />
      <Route
        path='/data-kehadiran/form-data-kehadiran/edit/:id'
        element={<FormEditAttendance />}
      />
      <Route
        path='/data-potongan'
        element={<DataPotongan />}
      />
      <Route
        path='/data-potongan/form-data-potongan/add'
        element={<FormAddDeduction />} />
      <Route
        path='/data-potongan/form-data-potongan/edit/:id'
        element={<FormEditDeduction />} />
      <Route
        path='/data-gaji'
        element={<DataGaji />}
      />
      <Route
        path='/data-gaji/detail-data-gaji/name/:name'
        element={<SalaryDetail />}
      />
      <Route
        path='/data-gaji/cetak-gaji/slip-gaji/name/:name'
        element={<PrintPdfPayslip />}
      />

      {/* Laporan Admin */}
      <Route
        path='/laporan/gaji'
        element={<LaporanGaji />}
      />
      <Route
        path='/laporan/gaji/print-page'
        element={<PrintPdfLaporanGaji />}
      />
      <Route
        path='/laporan/absensi'
        element={<LaporanAbsensi />}
      />
      <Route
        path='/laporan/absensi/print-page'
        element={<PrintPdfAttendanceReport />}
      />
      <Route
        path='/laporan/slip-gaji'
        element={<SlipGaji />}
      />
      <Route
        path='/laporan/slip-gaji/print-page'
        element={<PrintPdfPayslip />}
      />

      {/* Pengaturan Admin */}
      <Route
        path='/ubah-password'
        element={<UbahPasswordAdmin />}
      />

      {/* Route Pegawai */}
      {/* Dashboard Data Gaji Pegawai */}
      <Route
        path='/data-gaji-pegawai'
        element={<DataGajiPegawai />}
      />
      <Route
        path='/data-gaji-pegawai/print-page'
        element={<PrintPdfDataGajiPegawai />}
      />
      <Route
        path='/ubah-password-pegawai'
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
