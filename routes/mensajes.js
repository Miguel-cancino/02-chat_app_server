//path :  /api/mensajes

/*
    path : api/usuarios
*/

const {Router} = require('express');
const { obtenerChat } = require('../controllers/mensajes');



const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// validar JWT
router.get('/:from',validarJWT, obtenerChat);

module.exports = router;