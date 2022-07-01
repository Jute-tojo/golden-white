import mongoose from 'mongoose';
require('../models/prix.model');

const ProduitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    ingredient: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    quantite: {
        type: Number,
        required: true
    },
    apport: {
        type: String,
        required: false
    },
    prix: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prix'}]

});

const ProduitModel = mongoose.model("Produit", ProduitSchema);

export {
    ProduitModel
}