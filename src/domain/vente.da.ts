import { ClientModel } from "../models/client.model";
import { VenteModel } from "../models/vente.model";
import { ProdVenteModel } from '../models/prodvente.model';
import { ProduitModel } from '../models/produit.model';
import { DepenseModel } from "../models/depense.model";

export class VenteDA {
    public async CreateVenteExistClient(idClient: Number, produit: any, depenses: any){
        try {
            await ClientModel.findById(idClient).then((data: any) => {
                var prodVendu: any, depense: any;
                var vente = new VenteModel({
                    client: data._id,
                    date: new Date().toISOString()
                });
                //save vente
                vente.save(function (err: any) {
                    if (err) return console.error(err.stack);
                    ClientModel.findOneAndUpdate({ _id: data._id }, { $push: { ventes: vente._id } }, { new: true }).then((data: any) => {
                        console.log("CLIENT is UPDATED");
                    });
                    //save produit vendu
                    produit.forEach((element: any) => {
                        ProduitModel.findOne({ nom: element.nom }).then(data => {
                            prodVendu = new ProdVenteModel({
                                quantite: element.Qtt,
                                produit: data._id,
                                prix: element.idPrix,
                                vente: vente._id
                            });
                            prodVendu.save(function (err: any) {
                                if (err) return console.error(err.stack);
                                VenteModel.findOneAndUpdate({ _id: vente._id }, { $push: { produits: prodVendu._id } }, { new: true }).then((data: any) => {
                                    console.log("Produit is added");
                                });
                                ProduitModel.findOne({produit: prodVendu.produit}).then(data => {
                                    ProduitModel.findOneAndUpdate({ _id: prodVendu.produit }, { quantite:  (data.quantite-element.Qtt)}, { new: true }).then((data: any) => {
                                        console.log("Produit QUANTITE is UPDATED");
                                    });
                                });
                            });

                        });
                    });
                    //save dépense
                    if(depenses.length>0){
                        depenses.forEach((element: any) => {
                            depense = new DepenseModel({
                                type: element.type,
                                montant: element.montant,
                                description: element.description,
                                vente: vente._id
                            });
                            depense.save(function (err: any) {
                                if (err) return console.error(err.stack);
                                VenteModel.findOneAndUpdate({ _id: vente._id }, { $push: { depenses: depense._id } }, { new: true }).then((data: any) => {
                                    console.log("Dépense is added");
                                });
                            });
    
                        });
                    }else{
                        return;
                    }
                    
                });
            });  
        }catch(err){
            throw err;
        }
    }

    public async CreateVenteNewClient(clt: any, produit: any, depenses: any) {
        
        const client = new ClientModel({
            nom: clt.nom,
            prenom: clt.prenom,
            numero: clt.numero,
            sexe: clt.sexe,
            distribution: clt.distribution,
            date: new Date().toISOString()
        });
        try {
            var prodVendu: any, depense: any;
            //save client
            await client.save(function (err: any) {
                if (err) return console.error(err.stack);

                var vente = new VenteModel({
                    client: client._id,
                    date: new Date().toISOString()
                });
                //save vente
                vente.save(function (err: any) {
                    if (err) return console.error(err.stack);
                    ClientModel.findOneAndUpdate({ _id: client._id }, { $push: { ventes: vente._id } }, { new: true }).then((data: any) => {
                        console.log("CLIENT is added");
                    });
                    //save produit vendu
                    produit.forEach((element: any) => {
                        ProduitModel.findOne({ nom: element.nom }).then(data => {
                            prodVendu = new ProdVenteModel({
                                quantite: element.Qtt,
                                produit: data._id,
                                prix: element.idPrix,
                                vente: vente._id
                            });
                            prodVendu.save(function (err: any) {
                                if (err) return console.error(err.stack);
                                VenteModel.findOneAndUpdate({ _id: vente._id }, { $push: { produits: prodVendu._id } }, { new: true }).then((data: any) => {
                                    console.log("Produit is added");
                                });
                                ProduitModel.findOne({produit: prodVendu.produit}).then(data => {
                                    ProduitModel.findOneAndUpdate({ _id: prodVendu.produit }, { quantite:  (data.quantite-element.Qtt)}, { new: true }).then((data: any) => {
                                        console.log("Produit QUANTITE is UPDATED");
                                    });
                                });
                                
                            });

                        });
                    });
                    //save dépense
                    if(depenses.length>0){
                        depenses.forEach((element: any) => {
                            depense = new DepenseModel({
                                type: element.type,
                                montant: element.montant,
                                description: element.description,
                                vente: vente._id
                            });
                            depense.save(function (err: any) {
                                if (err) return console.error(err.stack);
                                
                                VenteModel.findOneAndUpdate({ _id: vente._id }, { $push: { depenses: depense._id } }, { new: true }).then((data: any) => {
                                    console.log("Dépense is added");
                                });
                            });
    
                        });
                    }else{
                        return;
                    }
                    
                });
            });
            return;
        }
        catch (err) {
            throw err;
        }
    }
    date = new Date();
    //get month trie mbola tsy vita
    public async GetVenteMonth(mois: Number){
        this.date = new Date("2022-03-18T02:11:42.972+00:00");
        await VenteModel.find({ date: { $regex: "2022-03-" } }).then((data: any) => {
            console.log(data);
        });  
    }
    //mbola tsy vita ny get produit par vente id
    public async GetVenteProduits(idVente: any){
        const produits = await ProdVenteModel.find({ vente: idVente }).populate('produit').then((data: any) => {
            return data;
        });  
        return produits;
    }
}
