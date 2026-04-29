import mongoose from "mongoose";

const overtimeSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    overtime_date: {
        type: Date,
        required: true
    },
    overtime_hours: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending'
    },
    approved_at: {
        type: Date
    }
}, {
    timestamps: true
});

const Overtime = mongoose.model("Overtime", overtimeSchema);

export default Overtime;