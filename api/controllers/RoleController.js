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
}

module.exports = RoleController;