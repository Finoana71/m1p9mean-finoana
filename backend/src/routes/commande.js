var express = require('express');
var router = express.Router();
const controller = require("../controllers/commande.controller")
const authMiddle = require("../middlewares/auth.middleware");

router.post('/', [authMiddle.verifyToken, authMiddle.isClient], controller.creer);
router.put('/:id/livrer', [authMiddle.verifyToken, authMiddle.isLivreur], controller.livrer);
router.put('/:id/pretALivrer', controller.pretALivrer);
router.put('/:id/attribuerLivreur', controller.attribuerLivreur);
router.get('/get/benefice', controller.getBenefice);
router.get('/', [authMiddle.verifyToken], controller.getAllCommande);
router.get('/:id', controller.getCommande);
router.get('/get/aLivrer', [authMiddle.verifyToken, authMiddle.isLivreur], controller.getCommandeALivrer);

module.exports = router;
