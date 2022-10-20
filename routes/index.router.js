var express = require("express");
var router = express.Router();
// Controllers
const { welcomeMessage } = require("../controllers/index.controller");

// GET
router.get("/", welcomeMessage);

module.exports = router;
