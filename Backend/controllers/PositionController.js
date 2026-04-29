import Position from "../models/PositionModel.js";
import Employee from "../models/EmployeeModel.js";

// Get all positions
export const getPositions = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Position.find().populate('employee_id', 'employee_name username role');
        } else {
            return res.status(403).json({ msg: "Access denied" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get position by ID
export const getPositionById = async (req, res) => {
    try {
        const response = await Position.findById(req.params.id);
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg: 'Position with that ID was not found'});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Create position
export const createPosition = async (req, res) => {
    const {
        position_id, position_name, base_salary, transport_allowance, meal_allowance
    } = req.body;

    if (base_salary < 0 || transport_allowance < 0 || meal_allowance < 0) {
        return res.status(400).json({ msg: "Salary fields cannot be negative" });
    }

    try {
        if (req.role === "admin") {
            await Position.create({
                position_id,
                position_name,
                base_salary,
                transport_allowance,
                meal_allowance,
                employee_id: req.userId
            });
        } else {
            return res.status(403).json({ msg: "Access denied" });
        }
        res.status(201).json({ success: true, message: "Position saved" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

// Update position
export const updatePosition = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) return res.status(404).json({ msg: "Data not found" });
        const { position_name, base_salary, transport_allowance, meal_allowance } = req.body;

        if (base_salary < 0 || transport_allowance < 0 || meal_allowance < 0) {
            return res.status(400).json({ msg: "Salary fields cannot be negative" });
        }

        if (req.role === "admin") {
            await Position.findByIdAndUpdate(req.params.id, {
                position_name, base_salary, transport_allowance, meal_allowance
            });
        } else {
            return res.status(403).json({ msg: "Access denied" });
        }
        res.status(200).json({ msg: "Position updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Delete position
export const deletePosition = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) return res.status(404).json({ msg: "Data not found" });
        if (req.role === "admin") {
            await Position.findByIdAndDelete(req.params.id);
        } else {
            return res.status(403).json({ msg: "Access denied" });
        }
        res.status(200).json({ msg: "Position deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}