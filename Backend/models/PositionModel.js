import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const positionSchema = new mongoose.Schema({
    position_id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    position_name: {
        type: String,
        required: true,
        maxlength: 120
    },
    base_salary: {
        type: Number,
        required: true
    },
    transport_allowance: {
        type: Number,
        required: true
    },
    meal_allowance: {
        type: Number
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
}, {
    timestamps: true
});

const Position = mongoose.model("Position", positionSchema);

export default Position;