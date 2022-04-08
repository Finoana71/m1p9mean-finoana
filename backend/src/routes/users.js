var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller")
const authMiddle = require("../middlewares/auth.middleware");
// router.post('/connexion', function(req, res, next) {
  
// });
console.log(authMiddle.isAdmin)
router.post('/inscription', controller.inscription);
router.post('/connexion', controller.connexion);
router.get('/activer', controller.activer);
router.post('/', [authMiddle.verifyToken, authMiddle.isAdmin], controller.nouveau);

// router.post('/nouveau', function(req, res, next) {
  
// });

// router.post('/', function(req, res, next) {
  
// });

module.exports = router;
