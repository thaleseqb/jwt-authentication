const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const autenticado = require("../middleware/autenticado");

const router = Router();

router.use(autenticado);

router.post("/usuarios", UsuarioController.criaUsuario);
router.get("/usuarios", UsuarioController.pegaUsuarios);
router.get("/usuarios/id/:id", UsuarioController.pegaUsuarioPorId);
router.put("/usuarios/id/:id", UsuarioController.atualizaUsuario);
router.delete("/usuarios/id/:id", UsuarioController.deletaUsuario);

module.exports = router;