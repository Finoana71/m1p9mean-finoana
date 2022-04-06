var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller")
// router.post('/connexion', function(req, res, next) {
  
// });

router.post('/inscription', controller.inscription);
router.post('/connexion', controller.connexion);
router.post('/activer', controller.activer);

// router.post('/nouveau', function(req, res, next) {
  
// });

// router.post('/', function(req, res, next) {
  
// });

module.exports = router;
