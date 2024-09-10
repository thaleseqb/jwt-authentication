const { Error } = require("sequelize");
const database = require("../models");
const uuid = require("uuid");

class PermissaoService {
    async criaCadastro(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (permissao) {
            throw new Error("Permissão já existe noi banco de dados");
        }

        try {
            const novaPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return novaPermissao;
        } catch (error) {
            throw new Error(`Ocorreu um erro ao cadastrar permissão: ${error}`);
        }
    }

    async pegaListaPermissao() {
        const permissoes = await database.permissoes.findAll();
        return permissoes;
    }

    async pegaPermissaoPorId(id) {
        try {
            const permissao = await database.permissoes.findOne({
                where: {
                    id
                }
            });
    
            if (!permissao) {
                throw new Error("Permissão não cadastrada");
            }

            return permissao;
        } catch (error) {
            throw new Error(`Ocorreu um erro ao tentar pegar permissão por id: ${error}`);
        }
    }

    async atualizaPermissao(dto) {
        const permissaoAatualizar = await this.pegaPermissaoPorId(dto.id);

        try {
            permissaoAatualizar.nome = dto.nome;
            permissaoAatualizar.descricao = dto.descricao;
            await permissaoAatualizar.save();
            return permissaoAatualizar;

        } catch (error) {
            throw new Error(`Ocorreu um erro ao tentar atualizar permissão: ${error}`);
        }
    }

    async deletaPermissao(id) {
        
        try {
            await this.pegaPermissaoPorId(id);
            await database.permissoes.destroy({
                where: {
                    id
                }
            });

        } catch (error) {
            throw new Error(`Ocorreu um erro ao tentar deletar permissao: ${error}`);
        }
    }
}

module.exports = PermissaoService;