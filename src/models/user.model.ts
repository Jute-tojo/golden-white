import mongoose from 'mongoose';
require('../models/role.model');

const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
});

const UserModel = mongoose.model("User", UserSchema);

export {
    UserModel
}