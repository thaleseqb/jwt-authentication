const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();

router.post("/usuarios", UsuarioController.criaUsuario);
router.get("/usuarios");
router.get("/usuarios/id/:id");
router.put("/usuarios/id/:id");
router.delete("/usuarios/id/:id");

module.exports = router;