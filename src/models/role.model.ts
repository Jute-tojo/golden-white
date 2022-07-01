import mongoose from 'mongoose';
require('../models/user.model');

const RoleSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const RoleModel = mongoose.model("Role", RoleSchema);

export {
    RoleModel
}