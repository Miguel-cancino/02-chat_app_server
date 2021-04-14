/*
    path : api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario,login, renewToken } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post ('/new', [
    check('nombre','El nombre es obligatirio').not().isEmpty(),
    check('email','El email es obligatirio').isEmail(),
    check('password','El email debe tener minimo 5 caracteres').not().isEmpty().isLength({min:5}),
    
    validarCampos
], crearUsuario);

router.post('/',[
    check('email','El email es obligatirio').isEmail(),
    check('password','El email debe tener minimo 5 caracteres').not().isEmpty().isLength({min:5}),
    validarCampos
], login);

// validar JWT
router.get('/renew',validarJWT, renewToken);

module.exports = router;