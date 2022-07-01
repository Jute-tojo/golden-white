import mongoose from 'mongoose';
require('../models/vente.model');

const DepenseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    montant: {
        type: Number,
        required: true
    },
    vente: { type: mongoose.Schema.Types.ObjectId, ref: 'Vente'}
});

const DepenseModel = mongoose.model("Depense", DepenseSchema);

export {
    DepenseModel
}
