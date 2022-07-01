import { VenteDA } from '../domain/vente.da';

export class VenteService {
    constructor(public venteDa: VenteDA){}
    //Nouveau client
    public async CreateVente(vente: any) : Promise<any>{
        try {
            const data = await this.venteDa.CreateVenteNewClient(vente.client, vente.produit, vente.depense);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    //Client existant
    public async CreateExistant(vente: any) : Promise<any>{
        try {
            const data = await this.venteDa.CreateVenteExistClient(vente.id, vente.produit, vente.depense);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    //Get Par Date
    public async GetByDate(mois: Number){
        try {
            const data = this.venteDa.GetVenteMonth(mois);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public async GetVente(id: any){
        try {
            const data = this.venteDa.GetVenteProduits(id);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}