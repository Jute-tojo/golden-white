import { Router, Response, Request } from 'express';
import { VenteService } from '../services/vente.service';

export const VenteRoute = (router: Router, service: VenteService): void => {
    // POST
    router.post('/vente', async (request, response) => {
        try {            
            await service.CreateVente(request.body);
            return response.json({success: true});
        }
        catch (err) {
            return response.json({success: false});
        }
    });

    router.post('/vente/existant', async (request, response) => {
        try {            
            await service.CreateExistant(request.body);
            return response.json({success: true});
        }
        catch (err) {
            return response.json({success: false});
        }
    });

    router.get('/vente/date/:mois', async (request, response) => {
        try {   
            await service.GetByDate(parseInt(request.params.mois));
            return response.json({success: true});
        }
        catch (err) {
            return response.json({success: false});
        }
    });
    router.get('/vente/:id/produits', async (request, response) => {
        try {   
            const produits = await service.GetVente(request.params.id);
            return response.json({success: true, produits});
        }
        catch (err) {
            return response.json({success: false});
        }
    });
}