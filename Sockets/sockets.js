//Mensajes de Sockets

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');







io.on('connection', (client) => {
    console.log('Cliente conectado');
   

   

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) { 
      return client.disconnect();
    }

    
    usuarioConectado(uid);
    io.emit('Usuarios-update');
  

    //ingresar al usuario a una sala en particular jeje

    client.join(uid);

    //escuchar mensaje personal

    client.on('mensaje-personal', async(payload) => {
      //todo: grabar mensaje
      console.log(payload.to);
      await grabarMensaje(payload);
      io.to(payload.to).emit('mensaje-personal', payload);
    });

 


    client.on('disconnect', () => { 
      usuarioDesconectado(uid);
      io.emit('Usuarios-update');
     });

    
  });