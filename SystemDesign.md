# HLD + LLD — Overtime Feature + Ticket Blitz

## High-Level Design (HLD)

### Scope
- New feature: Overtime Entry & Approval for Site Workers.
- Five tickets: LF-101..LF-105.

### Architecture (Existing)
- Frontend: React + Vite, Redux, Axios.
- Backend: Node/Express + Sequelize + MySQL.
- Auth: Session-based.
- Data: MySQL.

### Proposed Additions
1. Overtime Module
   - Backend: model + controller + route.
   - Frontend: page + form + API integration.
2. Validation Layer
   - Frontend validation for UX.
   - Backend validation for safety.
3. Ticket fixes
   - LF-101: date format fix.
   - LF-102: positive salary validation.
   - LF-103: designation dropdown.
   - LF-104: export CSV.
   - LF-105: responsive list.

### Data Model (New)
- Table `overtime_entries`:
  - id (PK)
  - employee_id (FK -> data_pegawai.id)
  - date (DATE)
  - hours (INT)
  - reason (VARCHAR)
  - status (ENUM: pending/approved/rejected) [optional]
  - createdAt, updatedAt

### API (New)
- POST /overtime
- (Optional) GET /overtime

### Backend Validations
- required fields
- hours 1..6
- date not future, not >7 days old
- no duplicate for employee_id + date
- employee exists
- monthly total + entry <= 60 hours

### Frontend Validations
- same as backend
- user-friendly error messages

### UI Flow
- Select employee
- Pick date
- Enter hours + reason
- Submit -> show success or error

---

## Low-Level Design (LLD)

### Database
- Create table `overtime_entries`.
- Index on (employee_id, date).
- Index on (employee_id, date) for month total query.

### Backend
- Model: `OvertimeEntryModel`
- Controller: `OvertimeController`
  - createOvertimeEntry(req, res)
    - Validate required fields
    - Validate hours range
    - Validate date window
    - Validate employee exists
    - Check duplicate for (employee_id + date)
    - Sum monthly hours for employee
    - Reject if total > 60
    - Save entry
- Route: `POST /overtime`

### Frontend
- Page: `Overtime` form
- Fields:
  - employee select
  - date input
  - hours input
  - reason textarea
- On submit:
  - run validations
  - call API
  - show error/success

### Ticket LLD
- LF-101: Change payslip date format to DD/MM/YYYY.
- LF-102: Salary fields must be positive (front + back).
- LF-103: Add `designation` dropdown on employee create/edit, store and list it.
- LF-104: Add CSV export button for employee list.
- LF-105: Make employee list responsive on mobile (scroll or stacked).

---

## Commit Plan
- Commit 1: Overtime feature
- Commit 2: LF-101
- Commit 3: LF-102
- Commit 4: LF-103
- Commit 5: LF-104
- Commit 6: LF-105