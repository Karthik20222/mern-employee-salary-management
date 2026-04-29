import moment from 'moment';
import Employee from '../models/EmployeeModel.js';
import Overtime from '../models/OvertimeModel.js';

const formatOvertimeEntry = (entry, employeeData) => ({
    id: entry._id,
    employee_id: entry.employee_id,
    employee_name: employeeData ? employeeData.employee_name : null,
    national_id: employeeData ? employeeData.national_id : null,
    overtime_date: entry.overtime_date,
    overtime_hours: entry.overtime_hours,
    reason: entry.reason,
    status: entry.status,
    approved_at: entry.approved_at,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
});

const validateOvertimePayload = ({ employee_id, overtime_date, overtime_hours, reason }) => {
    if (!employee_id || !overtime_date || !overtime_hours || !reason) {
        return 'All fields are required';
    }

    const overtimeHours = Number(overtime_hours);
    const selectedDate = moment(overtime_date, 'YYYY-MM-DD', true);
    const today = moment().startOf('day');
    const earliestAllowedDate = moment().startOf('day').subtract(7, 'days');

    if (isNaN(overtimeHours) || overtimeHours < 1 || overtimeHours > 6) {
        return 'Overtime hours must be between 1 and 6';
    }

    if (!selectedDate.isValid()) {
        return 'Invalid overtime date';
    }

    if (selectedDate.isAfter(today, 'day')) {
        return 'Date cannot be in the future';
    }

    if (selectedDate.isBefore(earliestAllowedDate, 'day')) {
        return 'Date cannot be more than 7 days in the past';
    }

    if (reason.trim().length < 10) {
        return 'Reason must be at least 10 characters';
    }

    return null;
};

// Get all overtime entries
export const viewOvertimeEntries = async (req, res) => {
    try {
        const overtimeEntries = await Overtime.find().sort({ overtime_date: -1, createdAt: -1 });

        const employees = await Employee.find({}, 'employee_name national_id');
        const employeeMap = new Map(
            employees.map((employee) => [employee._id.toString(), employee])
        );

        const response = overtimeEntries.map((entry) => {
            const employeeData = employeeMap.get(entry.employee_id.toString());
            return formatOvertimeEntry(entry, employeeData);
        });

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Create overtime entry
export const createOvertimeEntry = async (req, res) => {
    const { employee_id, overtime_date, overtime_hours, reason } = req.body;

    try {
        const validationError = validateOvertimePayload({
            employee_id,
            overtime_date,
            overtime_hours,
            reason,
        });

        if (validationError) {
            return res.status(400).json({ msg: validationError });
        }

        const overtimeHours = Number(overtime_hours);
        const selectedDate = moment(overtime_date, 'YYYY-MM-DD', true);
        const overtimeDate = selectedDate.toDate();

        const employeeData = await Employee.findById(employee_id);

        if (!employeeData) {
            return res.status(404).json({ msg: 'Worker not found' });
        }

        const duplicateEntry = await Overtime.findOne({
            employee_id,
            overtime_date: {
                $gte: selectedDate.clone().startOf('day').toDate(),
                $lte: selectedDate.clone().endOf('day').toDate()
            }
        });

        if (duplicateEntry) {
            return res.status(400).json({ msg: 'Duplicate overtime entry for the same worker and date' });
        }

        const monthStart = selectedDate.clone().startOf('month').toDate();
        const monthEnd = selectedDate.clone().endOf('month').toDate();

        const monthlyOvertimeEntries = await Overtime.find({
            employee_id,
            overtime_date: {
                $gte: monthStart,
                $lte: monthEnd
            }
        });

        const currentMonthlyOvertime = monthlyOvertimeEntries.reduce(
            (total, entry) => total + Number(entry.overtime_hours || 0),
            0
        );

        if (currentMonthlyOvertime + overtimeHours > 60) {
            return res.status(400).json({ msg: 'Monthly overtime for this worker cannot exceed 60 hours' });
        }

        const overtimeEntry = await Overtime.create({
            employee_id,
            overtime_date: overtimeDate,
            overtime_hours: overtimeHours,
            reason: reason.trim(),
            status: 'pending',
        });

        return res.status(201).json({
            msg: 'Overtime entry submitted for payroll processing',
            overtime: formatOvertimeEntry(overtimeEntry, employeeData),
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// Approve overtime entry
export const approveOvertimeEntry = async (req, res) => {
    try {
        const overtimeEntry = await Overtime.findById(req.params.id);

        if (!overtimeEntry) {
            return res.status(404).json({ msg: 'Overtime entry not found' });
        }

        if (overtimeEntry.status === 'approved') {
            return res.status(400).json({ msg: 'Overtime entry is already approved' });
        }

        overtimeEntry.status = 'approved';
        overtimeEntry.approved_at = new Date();
        await overtimeEntry.save();

        const employeeData = await Employee.findById(overtimeEntry.employee_id);

        return res.json({
            msg: 'Overtime entry approved',
            overtime: formatOvertimeEntry(overtimeEntry, employeeData),
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};