const PermissaoService = require("../services/PermissaoService");
const permissaoService = new PermissaoService();

class PermissaoController {
    static async criaCadastro(req, res) {
        const { nome, descricao } = req.body;
        try {
            const permissao = await permissaoService.criaCadastro({nome, descricao});
            return res.status(201).send(permissao);
            
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    }

    static async pegaListaPermissao(req, res) {
        const listaPermissao = await permissaoService.pegaListaPermissao();
        return res.status(200).send(listaPermissao);
    }

    static async pegaPermissaoPorId(req, res) {
        
        const { id } = req.params;

        try {
            const permissao = await permissaoService.pegaPermissaoPorId(id);
            return res.status(200).send(permissao);

        } catch (error) {
            return res.status(400).send(permissao);
        }

    }
    
    static async atualizaPermissao(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        try {
            await permissaoService.atualizaPermissao({id, nome, descricao});
            return res.sendStatus(204);
            
        } catch (error) {
            return res.status(400).send({message:error.message});
        }
    }

    static async deletaPermissao(req, res) {
        const { id } = req.params;

        try {
            await permissaoService.deletaPermissao(id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    }
}

module.exports = PermissaoController;