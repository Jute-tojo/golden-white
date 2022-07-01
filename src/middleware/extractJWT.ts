import { Response ,Request ,NextFunction } from "express";
import  jwt  from "jsonwebtoken";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    
    let token: any = req.headers.authorization?.split(' ')[0];
    if(token){
        jwt.verify(token,  process.env.SERVER_TOKEN_SECRET, (error: any, decoded: any) => {
            if(error){
                return res.status(404).json({
                    message: error.message,
                    error
                });
            }else{
                res.locals.jwt = decoded;
                next();
            }
        });
    }else{
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }
}

export default extractJWT;