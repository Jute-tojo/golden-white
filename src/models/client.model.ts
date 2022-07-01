import mongoose from 'mongoose';
require('../models/vente.model');

const ClientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    distribution: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    ventes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vente'}]
});

const ClientModel = mongoose.model("Client", ClientSchema);

export {
    ClientModel
}
