import mongoose from 'mongoose';
require('../models/prodvente.model');
require('../models/depense.model');
require('../models/client.model');
require('../models/vente.model');

const VenteSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    depenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Depense'}],
    produits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProdVente'}]
});

const VenteModel = mongoose.model("Vente", VenteSchema);

export {
    VenteModel
}
