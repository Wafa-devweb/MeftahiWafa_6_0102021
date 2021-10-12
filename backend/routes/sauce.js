// import express...
const express = require('express');
// création du routeur avec "express"
const router = express.Router();

// import du middleware pour protéger les routes 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

//création des routes get pour obtenir des info /put pour maj / delete pour supprime des données
//middleware auth passe comme argument aux routes à protéger
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

// export du router 
module.exports = router;
