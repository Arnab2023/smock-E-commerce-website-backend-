const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const AdminModel = require("../models/AdminModel");

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    if(!name) {
        res.status(401);
        throw new Error("Invalid name");
    }
    if(!password){
        res.status(401);
        throw new Error("Invalid password");
    }
    const existsWithName = await AdminModel.findOne({ name });
    if(existsWithName){
        res.status(403);
        throw new Error("Admin with same name already exists, please try with another name");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const admin = await AdminModel.create({
        name,
        password: hashedPass
    });
    res.status(201).json(admin);
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password){
        res.status(403);
        throw new Error("Invalid name or password");
    }
    let admin = await AdminModel.findOne({ name });
    if(!admin){
        res.status(404);
        throw new Error("Invalid name");
    }
    else{
        const comparePass = await bcrypt.compare(password, admin.password);
        if (comparePass) {
            const accessToken = jwt.sign({
                admin: {
                    id: admin._id,
                    name: admin.name,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
            );
            res.status(200).json(accessToken);
        }
        else{
            res.status(404);
            throw new Error("Invalid password");
        }
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    if(!name) {
        res.status(401);
        throw new Error("Invalid name");
    }
    if(!password){
        res.status(401);
        throw new Error("Invalid password");
    }
    const existsWithName = await AdminModel.findOne({ name });
    if(!existsWithName){
        res.status(403);
        throw new Error("Admin not Found");
    }
    console.log(existsWithName);
    const hashedPass = await bcrypt.hash(password, 10);
    filter = {
        name
    };
    update = {
        password: hashedPass,
    }
    const admin = await AdminModel.findOneAndUpdate(filter, update);
    res.status(201).json(admin);
});


const deleteAdmin = asyncHandler(async (req, res) => {
    const { password } = req.body;
    if(!password){
        res.status(401);
        throw new Error("Invalid password");
    }
    const existsWithName = await AdminModel.findById(req.params.id);
    if(!existsWithName){
        res.status(403);
        throw new Error("Admin not Found");
    }
    const comparePass = await bcrypt.compare(password, existsWithName.password);
    if(comparePass){
        const admin = await AdminModel.findByIdAndDelete(req.params.id);
    }
    else {
        res.status(401);
        throw new Error("Password does not match");
    }
    res.status(201).json({ message: "Admin Deleted!!"});
});

const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
});

const getSingleAdmin = asyncHandler(async (req, res) => {
    const admin = await AdminModel.findOne({ _id: req.params.id });
    res.status(200).json(admin);
});

module.exports = { getAllAdmins, getSingleAdmin, loginAdmin, registerAdmin, updatePassword, deleteAdmin }