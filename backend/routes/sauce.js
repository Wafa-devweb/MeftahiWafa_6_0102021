// import express...
const express = require('express');

const router = express.Router();

// import du middleware pour protéger les routes 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');


router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

// export du router 
module.exports = router;
