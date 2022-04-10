var express = require('express');
var router = express.Router();
const controller = require("../controllers/plat.controller")
const authMiddle = require("../middlewares/auth.middleware");
const restoCont = require("../controllers/restaurant.controller")

router.post('/', [authMiddle.verifyToken, authMiddle.isRestaurant], controller.creer);
router.get('/', [authMiddle.verifyToken, authMiddle.isRestaurant], restoCont.getPlatsRestaurant);

module.exports = router;
