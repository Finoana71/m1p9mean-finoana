var express = require('express');
var router = express.Router();
const controller = require("../controllers/user.controller")
const authMiddle = require("../middlewares/auth.middleware");

router.post('/inscription', controller.inscription);
router.post('/connexion', controller.connexion);
router.put('/activer', controller.activer);
router.get('/:id', [authMiddle.verifyToken], controller.getById);
// router.post('/', [authMiddle.verifyToken, authMiddle.isAdmin], controller.nouveau);
router.post('/', controller.nouveau);
// router.get('/', [authMiddle.verifyToken, authMiddle.isAdmin], controller.getAllUtilisateurs);
router.get('/', controller.getAllUtilisateurs);
router.get('/get/livreurs', controller.getAllLivreurs);


module.exports = router;
