import Employee from "../models/EmployeeModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      username: req.body.username
    });

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    const match = await argon2.verify(employee.password, req.body.password);

    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    req.session.userId = employee._id;

    res.status(200).json({
      employee_id: employee._id,
      employee_name: employee.employee_name,
      username: employee.username,
      role: employee.role,
      msg: "Login successful"
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please log in to your account." });
  }
  try {
    const employee = await Employee.findById(req.session.userId, 'national_id employee_name username role');
    if (!employee) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Unable to log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
}

export const changePassword = async (req, res) => {
  const userId = req.session.userId; 

  if (!userId) return res.status(401).json({ msg: "Please log in to your account." });

  const { password, confPassword } = req.body;

  if (password !== confPassword) return res.status(400).json({ msg: "Password and confirmation do not match" });

  try {
    const hashPassword = await argon2.hash(password);
    await Employee.findByIdAndUpdate(userId, { password: hashPassword });
    res.status(200).json({ msg: "Password updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const Register = async (req, res) => {
  const { national_id, employee_name, username, password, confPassword, gender, position, designation, hire_date, employment_status, role } = req.body;

  if (password !== confPassword) return res.status(400).json({ msg: "Password and confirmation do not match" });

  try {
    const hashPassword = await argon2.hash(password);
    const newEmployee = new Employee({
      national_id,
      employee_name,
      username,
      password: hashPassword,
      gender,
      position,
      designation,
      hire_date,
      employment_status,
      photo: "default.png", // Default photo
      role: role || "employee"
    });
    await newEmployee.save();
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};