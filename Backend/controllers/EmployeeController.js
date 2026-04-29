import Employee from "../models/EmployeeModel.js";
import argon2 from "argon2";
import path from "path";

// Get all employees
export const getEmployees = async (req, res) => {
    try {
        const response = await Employee.find({}, 'national_id employee_name gender position designation hire_date employment_status photo role');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const response = await Employee.findById(req.params.id, 'national_id employee_name gender position designation username hire_date employment_status photo role');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee with that ID was not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get employee by national ID
export const getEmployeeByNationalId = async (req, res) => {
    try {
        const response = await Employee.findOne({ national_id: req.params.nationalId }, 'national_id employee_name gender position hire_date employment_status photo role');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee with that national ID was not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// Get employee by name
export const getEmployeeByName = async (req, res) => {
    try {
        const response = await Employee.findOne({ employee_name: req.params.name }, 'national_id employee_name gender position hire_date employment_status photo role');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Employee with that name was not found' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create employee
export const createEmployee = async (req, res) => {
    const {
        national_id, employee_name,
        username, password, confPassword, gender,
        position, designation, hire_date,
        employment_status, role
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and confirmation do not match" });
    }

    let fileName = "default.png";
    let url = `${req.protocol}://${req.get("host")}/images/default.png`;

    if (req.files && req.files.photo) {
        const file = req.files.photo;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Photo file format is not allowed" });
        }

        if (fileSize > 2000000) {
            return res.status(422).json({ msg: "Image size must be under 2 MB" });
        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    try {
        const hashPassword = await argon2.hash(password);
        await Employee.create({
            national_id,
            employee_name,
            username,
            password: hashPassword,
            gender,
            position,
            designation,
            hire_date,
            employment_status,
            photo: fileName,
            url,
            role
        });
        res.status(201).json({ success: true, message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });

        const {
            national_id, employee_name,
            username, gender,
            position, designation, hire_date,
            employment_status, role
        } = req.body;

        await Employee.findByIdAndUpdate(req.params.id, {
            national_id,
            employee_name,
            username,
            gender,
            position,
            designation,
            hire_date,
            employment_status,
            role
        });
        res.status(200).json({ msg: "Employee updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update employee password (admin only)
export const changeEmployeePasswordByAdmin = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });

        const { password, confPassword } = req.body;
        if (password !== confPassword) return res.status(400).json({ msg: "Password and confirmation do not match" });

        if (employee.role === "employee") {
            const hashPassword = await argon2.hash(password);
            await Employee.findByIdAndUpdate(req.params.id, { password: hashPassword });
            res.status(200).json({ msg: "Employee password updated" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: "Employee not found" });
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Employee deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}