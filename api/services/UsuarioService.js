const { hash } = require("bcryptjs");
const database = require("../models");
const uuid = require("uuid");

class UsuarioService {
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
            const usuarioAtualizado = database.usuarios.create({
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