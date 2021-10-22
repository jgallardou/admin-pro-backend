const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        const usuarioDB = await Usuario.findOne({ email });

        //Verificar email
        if (!usuarioDB) {
            return response.status(400).json(
                {
                    ok: false,
                    msj: "contraseña incorrecta"
                }
            );
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return response.status(400).json(
                {
                    ok: false,
                    msj: "Contraseña no valida"
                }
            );
        }

        //Generar token - JWT
        const token = await generarJWT(usuarioDB.id);

        return response.status(200).json(
            {
                ok: true,
                token
            }
        );

    } catch (error) {
        console.error(error);
        response.status(500).json(
            {
                ok: false,
                msj: "Error inesperador....., revisar logs"
            }
        );
    }
};

module.exports = {
    login
}