const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authControllers');
const { validarCampos } = require('../middlewares/validar-campo');
const router = Router();

router.post("/",
    [
        check('email', "campo email obligatorio").isEmail(),
        check('password', "campo password obligatorio").not().isEmpty(),
        validarCampos
    ],
    login
)

module.exports = router;