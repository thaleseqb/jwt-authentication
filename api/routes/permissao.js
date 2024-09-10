const { Router } = require("express");
const PermissaoController = require("../controllers/Permissaocontroller");

const router = Router();

router.post("/permissao", PermissaoController.criaCadastro);
router.get("/permissao", PermissaoController.pegaListaPermissao);
router.get("/permissao/:id", PermissaoController.pegaPermissaoPorId);
router.delete("/permissao/:id", PermissaoController.deletaPermissao);
router.put("/permissao/:id", PermissaoController.atualizaPermissao);

module.exports = router;
