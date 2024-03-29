var express = require('express');
var router = express.Router();
const controller = require("../controllers/restaurant.controller")
const authMiddle = require("../middlewares/auth.middleware");


router.post('/', controller.insert);
router.get('/', controller.getAllRestaurant);
router.get('/get/commandes', controller.getCommandeRestaurant);
router.get('/:id/plats', controller.getPlatsRestaurant);
router.get('/:id', controller.getById);
router.get('/get/all', controller.getAll);
router.get('/get/benefice', controller.getBeneficeResto);

module.exports = router;
