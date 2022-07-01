import { ProduitModel } from "../models/produit.model";
import { Product } from "../types/produit.type";
import { PrixModel } from '../models/prix.model';

export class ProduitDA {
    public async GetProduits(): Promise<Product[]> {
        try {
            const data = await ProduitModel.find();
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    public async CreateProduit(parms: any): Promise<Product> {
        /*await ProduitModel.find({nom:"Mozzarela"}).populate("prix").then((data: any) => {     
            console.log(data[0].prix);
            return ;
        });        
        return;*/
        const produit = new ProduitModel({
            nom: parms.nom,
            ingredient: parms.ingredient,
            apport: parms.apport,
            quantite: parms.quantite,
            description: parms.description,
            image: parms.image
        });
        try {
            await produit.save(function (err: any) {
                if (err) return console.error(err.stack)

                console.log("Product is added");

                var clientSimple = new PrixModel({
                    montant: parms.prix.cs,
                    type: "Client Simple",
                    produit: produit._id
                });
                clientSimple.save(function (err: any) {
                    if (err) return console.error(err.stack)
                    ProduitModel.findOneAndUpdate({ _id: produit.id }, {$push: {prix: clientSimple._id}}, { new: true }).then((data: any) =>{
                        console.log("CS is added"); 
                    });
                });
                const epicerie = new PrixModel({
                    montant: parms.prix.epicerie,
                    type: "Epicerie",
                    produit: produit._id
                });
                epicerie.save(function (err: any) {
                    if (err) return console.error(err.stack)
                    ProduitModel.findOneAndUpdate({ _id: produit.id }, {$push: {prix: epicerie._id}}, { new: true }).then((data: any) =>{
                        console.log("Epicerie is added"); 
                    });    
                });
                const grossiste = new PrixModel({
                    montant: parms.prix.grossiste,
                    type: "Grossiste",
                    produit: produit._id
                });
                grossiste.save(function (err: any) {
                    if (err) return console.error(err.stack)
                    ProduitModel.findOneAndUpdate({ _id: produit.id }, {$push: {prix: grossiste._id}}, { new: true }).then((data: any) =>{
                        console.log("Grossiste is added"); 
                    });    
                });
                const grandeSurface = new PrixModel({
                    montant: parms.prix.gs,
                    type: "Grande Surface",
                    produit: produit._id
                });
                grandeSurface.save(function (err: any) {
                    if (err) return console.error(err.stack)
                    ProduitModel.findOneAndUpdate({ _id: produit.id }, {$push: {prix: grandeSurface._id}}, { new: true }).then((data: any) =>{
                        console.log("Grande Surface is added"); 
                    });    
                });
            });
            return produit;
        }
        catch (err) {
            throw err;
        }
    }

    public async getPrice(nomProduit: String, type: String){
        /*const produit = ProduitModel.findOne({nom: nomProduit}).then((data) => {
            return data._id
        });*/
        const produit = await ProduitModel.find({nom:nomProduit}).populate("prix").then((data: any) => { 
            return data[0].prix.find((element: any) => element.type==type);
        });
        return produit;
    }
}