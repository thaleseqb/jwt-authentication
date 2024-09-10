const { Error } = require("sequelize");
const database = require("../models");
const uuid = require("uuid");

class RoleService {
    async criaCadastro(dto) {
        const cadastro = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (cadastro) {
            throw new Error("Item já está cadastrado");
        }
        try {
            const novoCadastro = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novoCadastro;
            
        } catch (error) {
            throw new Error("Erro ao tentar cadastrar item");
        }
    }

    async pegaListaItens() {

    }
}

module.exports = RoleService;
