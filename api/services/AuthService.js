const { Error } = require("sequelize");
const database = require("../models");

class AuthService {
    async criaLogin(dto) {
        try {
            const usuario = await database.usuarios.findOne({
                attributes: ["id", "email", "senha"],
                where: {
                    email: dto.email
                }
            })
    
            if (!usuario) {
                throw new Error("Email não cadastrado");
            }
    
            return usuario;
        } catch (error) {
            throw new Error("Erro ao tentar fazer o login do usuário");
        }
    }
}

module.exports = AuthService;