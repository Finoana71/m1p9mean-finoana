var express = require('express');
var router = express.Router();
const controller = require("../controllers/plat.controller")
const authMiddle = require("../middlewares/auth.middleware");

router.post('/', controller.creer);

module.exports = router;
