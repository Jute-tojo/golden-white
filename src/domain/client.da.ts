import { ClientModel } from '../models/client.model';
import { VenteService } from './../services/vente.service';
export class ClientDA {
    valeur: any = [];
    resultat: any;
    client: any = [];
    public async GetClient(venteService: VenteService){
        try {
            await ClientModel.find().populate("ventes").then((data: any) => {    
                this.client = data;      
            });
            return this.client;
        }
        catch (err) {
            throw err;
        }
    }
    public async GetClientSearch(val: string){
        
        try {
            await ClientModel.find({ $or: [{ nom: {$regex: val.toUpperCase()} }, { prenom: {$regex: val} }, { numero: {$regex: val} }] }).then((data:any)=>{
                
                this.valeur = [];
                
                data.forEach((element: any) => {
                    this.valeur.push({nom: element.nom+' '+element.prenom+' '+element.numero});        
                });
                            
                return;
            });
            return this.valeur;
        }
        catch (err) {
            throw err;
        }
    }

    public async search(val: string){
        try {
            await ClientModel.findOne({ $or: [{ nom: {$regex: val.toUpperCase()} }, { prenom: {$regex: val} }, { numero: {$regex: val} }] }).then((data:any)=>{            
                this.resultat = data;
                return ;
            });
            
            return this.resultat;
        }
        catch (err) {
            throw err;
        }
    }
}
