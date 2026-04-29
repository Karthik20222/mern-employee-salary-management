import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const employeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    national_id: {
        type: String,
        required: true,
        maxlength: 16
    },
    employee_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        maxlength: 120,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        maxlength: 15
    },
    position: {
        type: String,
        required: true,
        maxlength: 50
    },
    designation: {
        type: String,
        required: true,
        maxlength: 50
    },
    hire_date: {
        type: String,
        required: true
    },
    employment_status: {
        type: String,
        required: true,
        maxlength: 50
    },
    photo: {
        type: String,
        required: true,
        maxlength: 100
    },
    url: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'employee']
    }
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;