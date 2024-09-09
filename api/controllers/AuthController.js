const AuthService = require("../services/AuthService");

const authService =  new AuthService();

class AuthController {
    static async criaLogin(req, res) {

        const { email, senha } =  req.body;
        try {
            const usuario = await authService.criaLogin({email, senha});
            return res.status(200).send({usuario});

        } catch (error) {
            res.status(401).send({message: error.message});
        }

    }
}

module.exports = AuthController;