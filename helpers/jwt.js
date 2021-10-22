const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }
        jwt.sign(payload, process.env.JWT_SECRET
            , { expiresIn: '12h' }, (error, token) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                resolve(token);
            }
        );

    });


};

module.exports = { generarJWT }