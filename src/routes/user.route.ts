import { Router, Response, Request, response } from 'express';
import  jwt from 'jsonwebtoken';
import passport from 'passport';
import { UserService } from '../services/user.service';
import extractJWT from './../middleware/extractJWT';
const bcrypt = require('bcryptjs');

export const UserRoute = (router: Router, service: UserService): void => {
    
    router.post('/user/register', async (req: Request, res: Response) => {
        try {
            const { nom, username, owner, password} = req.body;
            await service.CreateUser({ nom, username, owner, password});            
            res.json({success: true, msg: 'Utilisateur enregistré'});            
        }
        catch (err) {
            res.json({success: false, msg: 'Utilisateur non enregistré'});
        }
    });    
    
    
    router.post('/authenticate', async (request, response) => {
        const username = request.body.username;
        const password = request.body.password;
        
        service.getUserByUsername(username, (err: String, user: any) => {
            if(err) throw err;
            if(!user){
                return response.json({success: false, msg: 'Pseudo ou mot de passe incorrect'});
            }
            
            bcrypt.compare(password, user.password, async (err: String, isMatch: any) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(user.toObject(), "IspmGoldenWhite", {
                        expiresIn: 604800 //1 week
                    });

                    response.json({
                        success: true, 
                        token: 'JWT'+token,
                        user: {
                            nom: user.nom,
                            username: user.username                            
                        },
                        role: await service.GetUserRole(username)
                    });
                }else{
                    return response.json({success: false, msg: 'Pseudo ou mot de passe incorrect'});
                }
            });
        });
        
        

    });

    router.get('/home', passport.authenticate('jwt', {session: false}),async (request, response) => {
        require('./src/config/passport.js')(passport);
        response.json({user: request.user});
    });

    router.get('/validate', extractJWT, async (request, response) => {
        return response.status(200).json({
            message: 'Authorized'
        });
    });

    router.get('/users/:username', async (req: Request, res: Response) =>{
        const username = req.params.username;
        
            try {
                await service.getUserByUsername(username, (err: String, user: any) => {
                    if(err) throw err;
                    if(!user){
                        res.status(200).send(false);
                    }else{
                        res.status(200).send(true);
                    }
                });
            }
            catch (error) {
                res.status(200).send(false);
            }
    });
}