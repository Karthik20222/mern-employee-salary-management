import Employee from '../models/EmployeeModel.js'

export const verifyUser = async(req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please log in to your account."});
    }
    try {
        const employee = await Employee.findById(req.session.userId);
        if(!employee) return res.status(404).json({msg: "User not found"});
        req.userId = employee._id;
        req.role = employee.role;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
}

export const adminOnly = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Please log in to your account."});
    }
    try {
        const employee = await Employee.findById(req.session.userId);
        if(!employee) return res.status(404).json({msg: "Employee not found"});
        if(employee.role !== "admin") return res.status(403).json({msg: "Access denied"});
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
}