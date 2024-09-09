const UsuarioService = require("../services/UsuarioService");
const usuarioService = new UsuarioService();

class UsuarioController {
    static async criaUsuario(req, res) {
        const { nome, email, senha } = req.body;
        
        try {
            const usuario = await usuarioService.criaUsuario({nome, email, senha});
            return res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }
}

module.exports = UsuarioController;