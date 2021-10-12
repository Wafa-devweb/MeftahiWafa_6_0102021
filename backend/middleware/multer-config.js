// import du package 
const multer = require('multer');

// constante dictionnaire de type MIME
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
/* 
1. const à passer à 'multer' comme config, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants :
2. la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
3. la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. 
Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.split('.' + extension).join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

/*export l'élément multer entièrement configuré,lui passer la constante storage et 
indiquer que nous gérerons uniquement les téléchargements de fichiers image.*/
module.exports = multer({storage: storage}).single('image');
