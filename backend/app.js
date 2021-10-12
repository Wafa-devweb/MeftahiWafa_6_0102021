// import framework ect...
const express = require('express');
const bodyParser = require('bodyParser');
const mongoose = require('mongoose');
// import qui donne accès au chemin du système de fichier
const path = require('path');

/* // Load env variables
require('dotenv').config()
const db = process.env;*/

// import des routeurs 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//connect moongose
mongoose.connect('mongodb+srv://wafa-devweb:diddle07@cluster0.vvgpa.mongodb.net/readWriteAnyDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// creation de l'app express
const app = express();

// middleware générale appliqué a toutes les requetes /ajout de header au response
// permettent d'accéder à l'API depuis n'importe quelle origine '*'
// ajouter les headers mentionnés aux requêtes envoyées vers l'API ('Origin, X-Requested-With...)
// envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

// middleware qui utilise une methode bodyParser pour transformer le corps de la requete en json(objet javascript) utilisable
app.use(bodyParser.json());

// middleware qui indique à notre app comment traiter les requêtes vers la route /image, en rendant le dossier images statique.
app.use('/images', express.static(path.join(__dirname,'images')));
// enregistrement des routes (url) racines qui permettent la récupérations des données visées par le frontend 
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// permet l'export de l'application
module.exports = app;
