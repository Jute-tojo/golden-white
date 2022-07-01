import { ProduitDA } from './../domain/produit.da';
import { Product } from "../types/produit.type";

export class ProduitService {
    constructor(private produitDa: ProduitDA){}

    public async GetProduits() : Promise<Product[]>{
        try {
            const data = await this.produitDa.GetProduits();
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public async CreateProduit(produit: Product) : Promise<Product>{
        try {
            const data = await this.produitDa.CreateProduit(produit);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    
    public async GetPrice(nomProduit: String, type: String) : Promise<any>{
        try {
            const data = await this.produitDa.getPrice(nomProduit, type);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}