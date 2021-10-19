// import package jwt pour vérifier les tokens
const jwt = require('jsonwebtoken');

/* export du module
- mise en place du middleware / insertion à l'intérieur d'un bloc try...catch ;
- extraire le token du header Authorization de la requête entrante "const token,decodetoken,userId" (il contiendra le mot-clé Bearer et utilisation de la fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch);
- décoder notre token avec l'utilisation de la fonction verify. Si celui-ci n'est pas valide, une erreur sera générée;
- extraire l'ID utilisateur de notre token avec la const.userId;
- si la demande contient un ID utilisateur comparer à celui extrait du token /S'ils sont différents,générer une erreur ;
- dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. Nous passons l'exécution à l'aide de la fonction next() .
*/
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};