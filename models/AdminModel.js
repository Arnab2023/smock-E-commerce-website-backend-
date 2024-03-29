const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model("Admins", AdminSchema);