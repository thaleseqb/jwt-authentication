const UsuarioService = require("../services/UsuarioService");
const usuarioService = new UsuarioService();

class UsuarioController {

    static async pegaUsuarios(req, res) {
        try {
            const usuarios = await usuarioService.pegaUsuarios();

            return res.status(200).send(usuarios);

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async pegaUsuarioPorId(req, res) {
        const {id} = req.params;

        try {            
            const usuario = await usuarioService.pegaUsuarioPorId(id);

            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(500).send({message: error.message})
        }
    }

    static async atualizaUsuario(req, res) {
        const { nome, email } = req.body;
        const { id } = req.param;

        try {
            const usuario = await usuarioService.atualizaUsuario({ id, nome, email});
            return res.sendStatus(204);
        } catch (error) {
            res.status(400).send({message: error.message});
        }

    }

    static async deletaUsuario(req, res) {

        const { id } = req.params;

        try {
            await usuarioService.deletaUsuario(id);
            return res.sendStatus(204)
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    }

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