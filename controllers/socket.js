const Usuario = require ('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async(uid = '')=>{
    
  const usuario  =  Usuario.findById(uid);
  const update = { online : true}
  await usuario.updateOne(update);
}
const usuarioDesconectado = async(uid = '')=>{

    const usuario  =  Usuario.findById(uid);
    const update = { online : false}
    await usuario.updateOne(update);
}

const grabarMensaje = async(payload)=>{
  try {
    const mensaje = Mensaje(payload);
    await mensaje.save();
    return true;
  } catch (error) {
    return false;
  }
}


module.exports={
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}