var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = "IspmGoldenWhite";
    console.log("fdqsfdsq");
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        
        User.getUserById(jwt_payload._doc._id, (err, User) => {
            if (err) {
                return done(err, false);
            }
            if (User) {
                return done(null, User);
            } else {
                return done(null, false);
            }
        });
    }));
}



/*import {ExtractJwt, Strategy} from 'passport-jwt';
import { UserModel } from '../models/user.model';
//import { UserDA } from '../domain/user.da';
const JwtStrategy = require('passport-jwt').Strategy;
import { User } from '../types/types';
const userDa = require('../domain/user.da');
export class passports{
    public pass(passport: any){
        
        let opts: any = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'IspmGoldenWhite';
passport.use(new JwtStrategy(opts, function(jwt_payload: any, done: any) {
    console.log("fdsdsq = "+jwt_payload);
    
    UserModel.findOne({id: jwt_payload.sub}, function(err: any, user: any) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
    }
}*/