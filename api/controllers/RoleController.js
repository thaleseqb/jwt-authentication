const RoleService = require("../services/RoleService");
const roleService = new RoleService();

class RoleController {
    static async criaCadastro(req, res) {
        const { nome , descricao } = req.body;
        
        try {
            const role = await roleService.criaCadastro({nome, descricao});
            return res.status(201).send({role});
            
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    }

    static async pegaListaRoles(req, res) {
        const listaRoles = await roleService.pegaListaRoles();
        return res.status(200).send(listaRoles);
    }

    static async pegaRolePorId(req, res) {

        const { id } = req.params;
        
        try {
            const role = await roleService.pegaRolePorId(id);
            return res.status(200).send(role)
            
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    }

    static async atualizaRole(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        try {
            await roleService.atualizaRole({id, nome, descricao});
            return res.sendStatus(204);

        } catch (error) {
            return res. status(400).send({message: error.message});
        }
    }

    static async deletaRole(req, res) {
        const { id } = req.params;

        try {
            await roleService.deletaRole(id);
            res.sendStatus(204);
            
        } catch (error) {
            return res.status(400).send({message:error.message});
        }
    }
}

module.exports = RoleController;