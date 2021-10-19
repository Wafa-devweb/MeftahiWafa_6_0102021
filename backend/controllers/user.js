// import des données des packages..
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const user = require('../models/user');

/* fonction "signup" pour l'enregistement des nouveaux utilisateurs 
hachage des données pour le password:
1. appeler la fonction de hachage bcrypt.'hash'/ suivi du middleware et du 'password'/ lui demander de « saler » le password 10 fois
2. créer la promise then/cash : dans le bloc then, créer un utilisateur et l'enregistrer dans la base de données, en renvoyant une réponse /dans cash mettre la réponse en cas erreur.. */
exports.signup = (req, res, next) => {
    if(!validator.validate(req.body.email))return res.status(403).json({message: 'Le format de l\'adresse mail est incorrect.'})
    if(req.body.password.length > 8) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const myUser = new user({
                    email: req.body.email,
                    password: hash
                });
            myUser.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else return res.status(403).json({message: 'Votre mot de passe doit contenir 8 caractères minimum.'})
};

// fonction "login" pour connecter les utilisateurs existants (dasn cette fonction login on récupère l'utilisateur de la bas qui correspond à l'adresse mail entrée /si jamais l'email n'est pas correct un message d'erreur  ensuite on compare le mdp entrée avec le hach qui est gardé dans la base de donnée /si la comparaison n'est pas bonne elle renvoie une erreur /si elle est bonne c'est que l'utilisateur a bien rentree son id et on lui renvoie son userid et token )
exports.login = (req, res, next) => {
    // vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données
    user.findOne({ email: req.body.email })
    // retourne une promise then en cas de bonne réponse
        .then(myUser => { // vérifie si on trouve un user / si on ne trouve pas reponse'return' 401  
            if(!myUser) { return res.status(401).json({ error: 'Utilisateur non trouvé.' }); }
            // utiliser la fonction compare de 'bcrypt' pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, myUser.password)
            // promise then recoit un bolean 'valid' pour savoir si la comparaison et valable ou non /si elle n'est pas valable return res 401
            .then(valid => {
                if(!valid) { return res.status(401).json({ error: 'Mot de passe incorrect.' }); }
                const newToken = jwt.sign({ userId: myUser._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                res.setHeader('Authorization', 'Bearer '+ newToken);
                //si la reponse est bonne message (200)
                res.status(200).json({ // renvoie un objet json qui contiendra un userId et token
                    userId: myUser._id,// identifiant de l'utilisateur dans la base de donnée
                   // token: newToken //token chaine de caractère / generer un token crptée pour permettre la connection de l'utilisateur
                });
            })
            //promise catch en cas de problème de connection (500) erreur serveur
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};