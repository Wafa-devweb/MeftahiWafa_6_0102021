// import de mongoose..
const mongoose = require('mongoose');

// création du schéma de donnée /utilisation de la fonction mongoose.schema /objet de config 'userId' ect.. /config de l'objet 'type','required' ect
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: String, required: false },
    usersDisliked: { type: String, required: false }
});

// export du module model mongoose 'sauce'
module.exports = mongoose.model('sauce', sauceSchema);