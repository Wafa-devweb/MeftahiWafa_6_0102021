const express = require('express');
// création du routeur avec "express"
const router = express.Router();
// controllers qui va permettre d'associer les differents routes
const userCtrl = require('../controllers/user');


// création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// export du routeur
module.exports = router;