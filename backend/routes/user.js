// import express..
const express = require('express');
// création du routeur avec "express"
const router = express.Router();

// controller qui va permettre d'associer les differents routes
const userCtrl = require('../controllers/user');


// création de deux routes post (frontend va aussi envoyé des info)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// export du routeur
module.exports = router;