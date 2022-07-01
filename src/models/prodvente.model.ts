import mongoose from 'mongoose';
require('../models/produit.model');
require('../models/prix.model');
require('../models/vente.model');

const ProdVenteSchema = new mongoose.Schema({
    quantite: {
        type: Number,
        required: true
    },
    vente: { type: mongoose.Schema.Types.ObjectId, ref: 'Vente'},
    prix: { type: mongoose.Schema.Types.ObjectId, ref: 'Prix'},
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit'}
});

const ProdVenteModel = mongoose.model("ProdVente", ProdVenteSchema);

export {
    ProdVenteModel
}
