import Position from "../models/PositionModel.js";
import Employee from "../models/EmployeeModel.js";
import { Op } from "sequelize";

// Get all positions
export const getPositions = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Position.findAll({
                attributes: ['id', 'position_name', 'base_salary', 'transport_allowance', 'meal_allowance'],
                include: [{
                    model: Employee,
                    attributes: ['employee_name', 'username', 'role'],
                }]
            });
        } else {
            if (req.userId !== Position.userId) return res.status(403).json({ msg: "Access denied" });
            await Position.update({
                position_name, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ position_id: jabatan.position_id }, { employee_id: req.userId }]
                },
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get position by ID
export const getPositionById = async (req, res) => {
    try {
        const response = await Position.findOne({
            attributes: [
                'id','position_name', 'base_salary', 'transport_allowance', 'meal_allowance'
            ],
            where: {
                id: req.params.id
            }
        });
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
    try {
        if (req.role === "admin") {
            await Position.create({
                position_id: position_id,
                position_name: position_name,
                base_salary: base_salary,
                transport_allowance: transport_allowance,
                meal_allowance: meal_allowance,
                employee_id: req.userId
            });
        } else {
            if (req.userId !== Position.userId) return res.status(403).json({ msg: "Access denied" });
            await Position.update({
                position_name, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ position_id: jabatan.position_id }, { employee_id: req.userId }]
                },
            });
        }
        res.status(201).json({ success: true, message: "Position saved" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

// Update position
export const updatePosition = async (req, res) => {
    try {
        const jabatan = await Position.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jabatan) return res.status(404).json({ msg: "Data not found" });
        const { position_name, base_salary, transport_allowance, meal_allowance } = req.body;
        if (req.role === "admin") {
            await Position.update({
                position_name, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    id: jabatan.id
                }
            });
        } else {
            if (req.userId !== Position.userId) return res.status(403).json({ msg: "Access denied" });
            await Position.update({
                position_name, base_salary, transport_allowance, meal_allowance
            }, {
                where: {
                    [Op.and]: [{ position_id: jabatan.position_id }, { employee_id: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Position updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Delete position
export const deletePosition = async (req, res) => {
    try {
        const jabatan = await Position.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!jabatan) return res.status(404).json({ msg: "Data not found" });
        if (req.role === "admin") {
            await jabatan.destroy({
                where: {
                    id: jabatan.id
                }
            });
        } else {
            if (req.userId !== jabatan.userId) return res.status(403).json({ msg: "Access denied" });
            await jabatan.destroy({
                where: {
                    [Op.and]: [{ position_id: jabatan.position_id }, { employee_id: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Position deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}