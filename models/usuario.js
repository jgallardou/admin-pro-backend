const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    },
    vigente: {
        type: Boolean,
        default: true
    }
});

UsuarioShema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    return {
        uid: _id,
        ...object
    }
});

module.exports = model('Usuario', UsuarioShema);