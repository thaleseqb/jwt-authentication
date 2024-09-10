const { hash } = require("bcryptjs");
const database = require("../models");
const uuid = require("uuid");

class UsuarioService {

    async pegaUsuarios() {
        try {
            const listaUsuarios = await database.usuarios.findAll();
            return listaUsuarios;

        } catch (error) {
            throw new Error("Erro ao buscar por usuarios");
        }

    }

    async pegaUsuarioPorId(id) {

        try {
            const usuarioPorId = await database.usuarios.findByPk(id);
            
            if (!usuarioPorId) {
                throw new Error("Usuário não encontrado");
            }
            
            return usuarioPorId;
        } catch (error) {
            throw new Error("Erro ao buscar por usuario");
        }
    }

    async atualizaUsuario(dto) {
        const usuario = await this.pegaUsuarioPorId(dto.id);

        try {
            usuario.email = dto.email;
            usuario.nome = dto.nome;
            await usuario.save();
            return usuario;

        } catch (error) {
            throw new Error("Erro ao atulizar o usuário");
        }
    }

    async deletaUsuario(id) {
        try {
            await this.pegaUsuarioPorId(id);
            await database.usuarios.destroy({
                where: {
                    id
                }
            });

        } catch (error) {
            throw new Error("Erro ao tentar deletar o usuário");
        }
    }

    async criaUsuario(dto) {
        const usuario = await database.usuarios.findOne({    
            where : {
                email: dto.email
            }
        })
        if (usuario) {
            throw new Error("Usuario ja cadastrado");
        }

        try {
            const senhaHash = await hash(dto.senha, 8);
            const usuarioAtualizado = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });
            return usuarioAtualizado;

        } catch (error) {
            throw new Error("erro ao cadastrar usuario");   
        }
    }
}

module.exports = UsuarioService;