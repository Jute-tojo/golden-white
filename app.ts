import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const passport = require('passport');

import { ProuduitRoute } from './src/routes/Produit.route';
import { ProduitService } from './src/services/produits.service';
import { ProduitDA } from './src/domain/produit.da';
import { UserRoute } from './src/routes/user.route';
import { UserService } from './src/services/user.service';
import { UserDA } from './src/domain/user.da';
import { VenteRoute } from './src/routes/vente.route';
import { VenteService } from './src/services/vente.service';
import { VenteDA } from './src/domain/vente.da';
import { ClientRoute } from './src/routes/client.route';
import { ClientDA } from './src/domain/client.da';
import { ClientService } from './src/services/client.service';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//mongodb connection url = mongodb+srv://jute:IspmGoldenWhite@cluster0.ton6v.mongodb.net/onion?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost:27017/golden-white")
.then(() => console.log("Connected to MONGODB COMPASS"))
.catch((error) => console.error(error));

app.use(express.urlencoded({ extended: true }));

// Then pass these options to cors:
app.use(cors({
    origin: '*'
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
const session = require('express-session');

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: false
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy (authUser))


//require('./src/config/passport.js')(passport);

//Route
app.use(express.json());
const router = express.Router();
app.use('/api', router);

ClientRoute(router, new ClientService(new ClientDA), new VenteService(new VenteDA));
VenteRoute(router, new VenteService(new VenteDA()));
ProuduitRoute(router, new ProduitService(new ProduitDA()));
UserRoute(router, new UserService(new UserDA()));

app.use(cors);
app.listen(port, () => {
    console.log("running server PORT "+port);
});