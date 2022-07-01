import { Router, Response, Request } from 'express';
import { ClientService } from '../services/client.service';
import { VenteService } from './../services/vente.service';

export const ClientRoute = (router: Router, service: ClientService, venteSercie: VenteService): void => {
    // GET ALL
    router.get('/clients', async (request, response) => {
        try {            
            const clients = await service.GetClient(venteSercie);
            return response.json(clients);
        }
        catch (err) {
            return response.json("");
        }
    });
    //GET SEARCH
    router.get('/client/:keyword', async (request, response) => {
        try {            
            const clients = await service.GetClientSearch(request.params.keyword);
            return response.json(clients);
        }
        catch (err) {
            return response.json("");
        }
    }); //-> nom {nom prenom numero}
    router.get('/client/normalize/:keyword', async (request, response) => {
        try {            
            const clients = await service.Search(request.params.keyword);
            return response.json(clients);
        }
        catch (err) {
            return response.json("");
        }
    }); //-> data = {_id, nom, prenom, numéro}
}