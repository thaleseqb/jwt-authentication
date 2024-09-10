const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const router = Router();

router.post("/auth/login", AuthController.criaLogin);

module.exports = router;