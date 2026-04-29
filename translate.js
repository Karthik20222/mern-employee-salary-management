const fs = require('fs');
const path = require('path');

const replacements = {
  'Data Pegawai': 'Employee Data',
  'Data Jabatan': 'Position Data',
  'Data Kehadiran': 'Attendance Data',
  'Data Gaji Pegawai': 'Employee Salary Data',
  'Data Gaji': 'Salary Data',
  'Data Potongan Gaji': 'Salary Deduction Data',
  'Potongan Gaji': 'Salary Deduction',
  'Laporan Absensi Pegawai': 'Employee Attendance Report',
  'Laporan Absensi': 'Attendance Report',
  'Laporan Gaji Pegawai': 'Employee Salary Report',
  'Laporan Gaji': 'Salary Report',
  'Slip Gaji Pegawai': 'Employee Payslip',
  'Slip Gaji': 'Payslip',
  'Nama Pegawai': 'Employee Name',
  'Pilih Nama Pegawai': 'Select Employee Name',
  'Pilih Jabatan': 'Select Position',
  'Pilih Jenis Kelamin': 'Select Gender',
  'Pilih Hak Akses': 'Select Access Rights',
  'Jenis Kelamin': 'Gender',
  'Hak Akses': "Access Rights",
  'Tanggal Masuk': 'Join Date',
  'Gaji Pokok': 'Basic Salary',
  'Tunjangan Transport': 'Transport Allowance',
  'Uang Makan': 'Meal Allowance',
  'Total Gaji': 'Total Salary',
  'Cetak Slip Gaji': 'Print Payslip',
  'Cetak Laporan': 'Print Report',
  'Cetak Laporan Gaji': 'Print Salary Report',
  'Cetak Daftar Gaji': 'Print Salary List',
  'Ubah Password Pegawai': 'Change Employee Password',
  'Ubah Password': 'Change Password',
  'Simpan': 'Save',
  'Kembali': 'Back',
  'Tambah': 'Add',
  'Edit': 'Edit',
  'Hapus': 'Delete',
  'Aksi': 'Action',
  'Laki-laki': 'Male',
  'Perempuan': 'Female',
  'Hadir': 'Present',
  'Sakit': 'Sick',
  'Alpha': 'Absent',
  'Izin': 'Leave',
  'Menampilkan': 'Showing',
  'Bulan :': 'Month :',
  'Tahun :': 'Year :',
  'Cari Nama Pegawai...': 'Search Employee Name...',
  'Filter Data Gaji Pegawai': 'Filter Employee Salary Data',
  'Filter Laporan Absensi Pegawai': 'Filter Employee Attendance Report',
  'Filter Laporan Gaji Pegawai': 'Filter Employee Salary Report',
  'Filter Slip Gaji Pegawai': 'Filter Employee Payslip',
  'Selamat Datang di SiPeKa Anda Login Sebagai Pegawai.': 'Welcome to SiPeKa, you are logged in as an Employee.',
  'Data Admin': 'Admin Data',
  'Potongan': 'Deduction'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'Frontend', 'src'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (let [idId, enId] of Object.entries(replacements)) {
      // Replace only as exact string match or inside >...< or as substring
      let regex = new RegExp(idId, 'g');
      content = content.replace(regex, enId);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
console.log("Translation complete.");
