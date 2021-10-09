// import mongoose ect....
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// création du schéma // information du schéma email ect.. // protection des données avec unique true
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// validateur appliqué au schéma avant d'en faire un modèle //méthode plugin et uniquevalidator argument a cette valeur
userSchema.plugin(uniqueValidator);

// export du schéma sous forme de modèle //user schéma comme schéma de donnée
module.exports = mongoose.model('user', userSchema);