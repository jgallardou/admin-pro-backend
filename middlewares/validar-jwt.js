const jwt = require('jsonwebtoken');

const validarJWT = (request, response, next) => {
    //Leer token
    const token = request.header('x-token');
    if (!token) {
        return response.status(400).json(
            {
                ok: false,
                msj: "No hay token en la peticion"
            });
    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        request.uid = uid;
        next();

    } catch (error) {
        return response.status(401).json(
            {
                ok: false,
                msj: "Token no valido"
            }
        );
    }

};

module.exports = {
    validarJWT
}