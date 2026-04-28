# Execution Plan

## Overview
This plan covers the overtime feature and tickets LF-101 to LF-105 in the MERN Employee Salary Management repo. It is structured for atomic commits and aligns with required validations.

---

## 0) Baseline Setup
- Install dependencies in Backend and Frontend.
- Start Backend (`npm start`) and Frontend (`npm run dev`).
- Identify existing patterns for routing, controllers, models, form validation, and date formatting.

---

## 1) Part 1: Overtime Entry & Approval Feature

### 1.1 Backend: Database and Model
- Add a new `overtime` table:
  - `id` (PK)
  - `pegawai_id` (FK to employee)
  - `tanggal` (DATE)
  - `jam_lembur` (INT)
  - `alasan` (TEXT/VARCHAR)
  - `created_at`
- Add a unique constraint on `(pegawai_id, tanggal)` to prevent duplicates.
- Create `OvertimeModel.js` with methods:
  - `findByPegawaiAndDate(pegawai_id, tanggal)`
  - `getMonthlyOvertime(pegawai_id, month, year)`
  - `createOvertime(data)`

### 1.2 Backend: Controller and Route
- Create `OvertimeController.js` with `createOvertime` handler.
- Validation (server):
  - Required fields.
  - `jam_lembur` in 1..6.
  - `tanggal` not future and not older than 7 days.
  - `alasan` length >= 10.
  - `pegawai_id` must exist.
  - No duplicate overtime on same date for same worker.
  - Monthly total + new hours <= 60.
- Add route file and register it in `Backend/index.js`.

### 1.3 Frontend: Form + Validation
- Add a page for overtime entry (place under Admin/Transaksi or similar).
- Form fields:
  - Worker select (from employee list API).
  - Date.
  - Overtime hours.
  - Reason.
- Validation (client):
  - Required fields.
  - Hours 1..6.
  - Date not in future.
  - Date within last 7 days.
  - Reason length >= 10.
- Show inline errors and server errors.

### 1.4 Frontend: Routing and Navigation
- Register the new route in the app routes config.
- Add a sidebar/menu entry for site managers.

### 1.5 Commit
- One commit: `feat: add overtime entry with validation`

---

## 2) Part 2: Ticket Blitz

### 2.1 LF-101: Payslip Date Format
- Locate payslip date formatting.
- Update format to `DD/MM/YYYY`.
- Commit: `fix(LF-101): use DD/MM/YYYY on payslip`

### 2.2 LF-102: Disallow Negative Salary
- Frontend: validate salary fields to require positive numbers.
- Backend: validate salary in controller/model to reject <= 0.
- Commit: `fix(LF-102): block negative salary values`

### 2.3 LF-103: Add Designation Field
- Backend: add `designation` column and update model/controller.
- Frontend: add dropdown in employee create/edit form.
- Frontend: display designation in employee list.
- Values: Mason, Electrician, Plumber, Supervisor, Helper.
- Commit: `feat(LF-103): add designation to employee profile`

### 2.4 LF-104: Export Employee List to CSV
- Add a Download CSV button on employee list page.
- Export columns: name, designation, department, salary.
- Commit: `feat(LF-104): export employee list to CSV`

### 2.5 LF-105: Fix Mobile Layout on Employee List
- Make table responsive: add `overflow-x: auto` container or stacked layout on mobile.
- Commit: `fix(LF-105): make employee list responsive on mobile`

---

## 3) README Update
- Add setup steps for backend + frontend.
- Add HRMS choice + reason.
- List AI tools used and purpose.
- Note any deviations from requirements.
- Commit: `docs: update submission README`

---

## 4) Final Checks
- Run lint/build if available.
- Verify validation behavior in UI and API.
- Verify CSV export on sample data.
- Verify mobile layout.
- Push to GitHub.
