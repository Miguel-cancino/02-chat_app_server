const{response} = require ('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

   const {email,password} = req.body;
   
   try {

    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: "El correo ya está registrado"
        });
    }
    const usuario = new Usuario(req.body);
    
    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();

    //generar json Webtoken jtw
    const token = await generarJwt(usuario.id);

     res.json({
        ok: true,
        usuario,
        token
     });
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg: 'Hable con el administrador'
       })
   }

   

}

const login = async(req, res = response ) => {

    const {email,password} = req.body;
    
    try {
 
     const usuarioDb = await Usuario.findOne({email});
     if (!usuarioDb) {
        return res.status(404).json({
            ok: false,
            msg: 'Email no existe'
        });
     }
   

    const validPassword = bcrypt.compareSync(password, usuarioDb.password)
   
     if (!validPassword) {
        return res.status(404).json({
            ok: false,
            msg: 'Contraseña no válida'
        });
     }

     const token = await generarJwt(usuarioDb.id);
     
     res.json({
        ok: true,
        usuario: usuarioDb,
        token
     });
      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
    
    
 
 }
 

 const renewToken = async(req, res = response) => {
     const uid = req.uid;

     const token = await generarJwt(uid);

     const usuarioDb = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario: usuarioDb,
        token
    });
}
module.exports = {
    crearUsuario,
    login,
    renewToken
}