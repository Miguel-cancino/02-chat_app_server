const Mensaje = require('../models/mensaje')
const obtenerChat = async (req,res) =>{

    const miId = req.uid;
    const mensajesFrom = req.params.from;
    const last30 = await Mensaje.find({
        $or:[{from: miId, to: mensajesFrom}, {from: mensajesFrom, to: miId}]
    }).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });

}

module.exports={
    obtenerChat
}