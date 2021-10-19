// import mongoose ect....
const mongoose = require('mongoose');
// ajout du plugins validator
const uniqueValidator = require('mongoose-unique-validator');

// création du schéma de donnée /objet de config 'email'ect../config de l'objet 'type','required' ect /protection des données avec unique true
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// validateur appliqué au schéma avant d'en faire un modèle /méthode 'plugin' et comme argument a cette valeur 'uniquevalidator'
userSchema.plugin(uniqueValidator);

// export du module model mongoose 'user'
module.exports = mongoose.model('user', userSchema);