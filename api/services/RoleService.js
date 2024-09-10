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

    async pegaListaRoles() {
        const listaRoles = await database.roles.findAll();
        return listaRoles;
    }

    async pegaRolePorId(id) {
        try {
            const role = await database.roles.findOne({
                where: {
                    id
                }
            });

            if (!role) {
                throw new Error("Não foi possível encontrar o role");
            }

            return role;
        } catch (error) {
            throw new Error(`Erro ao tentar buscar pelo role: ${error}`);
        }
    }

    async atualizaRole(dto) {
        const roleAatualizar = await this.pegaRolePorId(dto.id);

        try {
            roleAatualizar.nome = dto.nome;
            roleAatualizar.descricao = dto.descricao;
            await roleAatualizar.save();
            return roleAatualizar;
            
        } catch (error) {
            throw new Error(`Erro ao tentar atualizar role: ${error}`);
        }
    }

    async deletaRole(id) {
        try {
            await this.pegaRolePorId(id);
            await database.roles.destroy({
                where: {
                    id
                }
            });

        } catch (error) {
            throw new Error(`Erro ao tentar excluir Role: ${error}`);
        }
    }
}

module.exports = RoleService;
