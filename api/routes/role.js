const { Router } = require("express");
const RoleController = require("../controllers/RoleController");

const router = Router();

router.post("/roles", RoleController.criaCadastro);
router.get("/roles", RoleController.pegaListaRoles);
router.get("/roles/:id", RoleController.pegaRolePorId);
router.delete("/roles/:id", RoleController.deletaRole);
router.put("/roles/:id", RoleController.atualizaRole);

module.exports = router;