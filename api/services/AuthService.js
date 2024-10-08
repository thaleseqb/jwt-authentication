const { Error } = require("sequelize");
const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

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
    
            const senhasIguais = await compare(dto.senha, usuario.senha);

            if (!senhasIguais) {
                throw new Error("Usuário ou senha incorreta");
            } 
    
            const accessToken = sign({
                id: usuario.id,
                email: usuario.email
            }, jsonSecret.secret, {
                expiresIn: 43200
            });
    
            return { accessToken };
        } catch (error) {
            throw new Error(`Erro ao tentar logar usuário: ${error}`);
        }
    }
}

module.exports = AuthService;