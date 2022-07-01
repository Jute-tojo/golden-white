import { ClientDA } from '../domain/client.da';
import { VenteService } from './vente.service';

export class ClientService {
    constructor(public clientDa: ClientDA){}

    public async GetClient(venteSercie: VenteService) : Promise<any>{
        try {
            const data = await this.clientDa.GetClient(venteSercie);
            
            
            
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public async GetClientSearch(nom: string) : Promise<any>{
        try {
            const data = await this.clientDa.GetClientSearch(nom);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public async Search(nom: string) : Promise<any>{
        try {
            const data = await this.clientDa.search(nom);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}