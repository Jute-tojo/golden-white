import mongoose from 'mongoose';
require('../models/produit.model');

const PrixSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit'}

});

const PrixModel = mongoose.model("Prix", PrixSchema);

export {
    PrixModel
}