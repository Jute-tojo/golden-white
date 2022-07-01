import { Router, Response, Request } from 'express';
import { ProduitService } from "../services/produits.service";

export const ProuduitRoute = (router: Router, service: ProduitService): void => {
    // GET ALL
    router.get('/produits', async (req: Request, res: Response) => {
        try {
            const produits = await service.GetProduits();
            res.status(200).send(produits);
        }
        catch (error) {
            res.status(500).send({ "err": error })
        }
    });
    // POST
    router.post('/produit', async (request, response) => {
        try {
            const { nom, ingredient, quantite, apport, description, image} = request.body.product;     
            const prix = request.body.prix;       
            
            const result = await service.CreateProduit({nom, ingredient, quantite, apport, prix, description, image});
            response.status(200).send(result)
        }
        catch (err) {
            response.status(500).send(err);
        }
    });
    //GET PRICE
    router.get('/produit/:nom/:type/prix', async (req: Request, res: Response) => {
        try {
            const prix = await service.GetPrice(req.params.nom, req.params.type);
            res.status(200).send({prix, "success": true});
        }
        catch (error) {
            res.send({ "err": error, "success": false })
        }
    });
}