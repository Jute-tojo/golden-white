import { UserModel } from "../models/user.model";
import { Role, User } from "../types/types";
const bcrypt = require('bcryptjs');

export class UserDA {
    role: String = "";

    public async CreateUser(parms: User) : Promise<any> {
        const user = new UserModel({
            nom: parms.nom,
            username: parms.username,
            owner: '62336056ecbe1aab65c69de4',
            password: parms.password
        });    
        console.log(user);
           
        bcrypt.genSalt(10, (err: String, salt: number) => {
            bcrypt.hash(user.password, salt, (err: String, hash: any) => {
                if(err) throw err
                user.password = hash;
                user.save();        
            });
        });        
    }

    public async GetUserRole(username: String){
        await UserModel.find({username:username}).populate("owner").then((data: any) => {     
            this.role = data[0].owner.nom;
            return ;
        });        
        return this.role;
    }

    public getUserById(id: String, callback: any){
        UserModel.findById(id, callback);
    }
    
    public getUserByUsername(username: String, callback: any){
        const query = {username: username};
        UserModel.findOne(query, callback);
    }

    public comparePassword(candidatePassword: any, hash: any, callback: any){
        bcrypt.compare(candidatePassword, hash, (err: any, isMatch: any) => {
            if(err) throw err;
            callback(null, isMatch);
        });
    }
}
