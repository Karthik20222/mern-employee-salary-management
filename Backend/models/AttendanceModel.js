import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
        maxlength: 15
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
    gender: {
        type: String,
        maxlength: 20
    },
    position_name: {
        type: String,
        maxlength: 50
    },
    present_days: {
        type: Number
    },
    sick_days: {
        type: Number
    },
    absent_days: {
        type: Number
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;