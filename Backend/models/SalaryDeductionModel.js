import mongoose from "mongoose";

const salaryDeductionSchema = new mongoose.Schema({
    deduction_name: {
        type: String,
        required: true,
        maxlength: 120
    },
    deduction_amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const SalaryDeduction = mongoose.model("SalaryDeduction", salaryDeductionSchema);

export default SalaryDeduction;