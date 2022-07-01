import { UserDA } from '../domain/user.da';
import { User, Role } from '../types/types';

export class UserService {
    constructor(public userDa: UserDA){}

    public async CreateUser(user: User) : Promise<User>{
        try {
            const data = await this.userDa.CreateUser(user);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public async GetUserRole(username: String) : Promise<any>{
        try {
            const data = await this.userDa.GetUserRole(username);
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    public getUserByUsername(username: String, callback: any){
        try {
            this.userDa.getUserByUsername(username, callback);
        }
        catch (error) {
            throw error;
        }
    }
}