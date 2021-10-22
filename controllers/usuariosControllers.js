const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const getUsuarios = (async (request, response) => {
    const usuarios = await Usuario.find({}, 'nombre email role vigente google');
    response.json(
        {
            ok: true,
            usuarios,
            uid: request.uid
        }
    );

});
const crearUsuarios = (async (request, response) => {

    const { password, email } = request.body;
    try {
        const existetEmail = await Usuario.findOne({ email });

        if (existetEmail) {
            return response.status(400).json(
                {
                    ok: false,
                    msg: "El correo ya se encuentra registrado"
                }
            );
        }

        const usuario = new Usuario(request.body);

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar Token

        const token = await generarJWT(usuario.id);

        response.status(201).json(
            {
                ok: true,
                usuario,
                token
            }
        );
    }
    catch (err) {
        console.error(err);
        response.status(500).json(
            {
                ok: true,
                msj: "Error inesperador....., revisar logs"
            }
        );
    }



});

const actualizarUsuario = async (request, response) => {
    const uid = request.params.id;
    try {

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return response.status(400).json({
                ok: false,
                msj: "uid no existe"
            });
        }
        const { password, google, email, ...campos } = request.body;
        console.log(campos);
        if (usuario.email !== email) {
            const existetEmail = await Usuario.findOne({ email });
            if (existetEmail) {
                return response.status(400).json(
                    {
                        ok: false,
                        msj: "El email ingresado ya se encuentra asociado a otra cuenta"
                    }
                );
            }
        }
        campos.email = email;
        const updateUsuario = await Usuario.findByIdAndUpdate(uid, campos, { new: true })
        response.status(200).json({
            ok: true,
            usuario: updateUsuario
        });

    } catch (err) {
        console.error(err);
        response.status(500).json(
            {
                ok: false,
                msj: "Error inesperador....., revisar logs"
            }
        );
    }

}

const eliminarUsuario = async (request, response) => {
    const uid = request.params.id;

    try {

        const existeUser = await Usuario.findById(uid);
        if (!existeUser) {
            return response.status(404).json(
                {
                    ok: false,
                    msj: "uid no existe"
                }
            );
        }

        const userDelete = await Usuario.findOneAndUpdate({ _id: uid }, { vigente: false }, { new: true })
        console.log(userDelete);
        return response.status(200).json(
            {
                ok: true,
                usuario: userDelete
            }
        );
    }
    catch (err) {
        console.error(err);
        response.status(500).json(
            {
                ok: false,
                msj: "Error inesperador....., revisar logs"
            }
        );
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    eliminarUsuario
}