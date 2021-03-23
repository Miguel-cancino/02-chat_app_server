//Mensajes de Sockets

const {io} = require('../index');
io.on('connection', client => {
    console.log('Cliente conectado')
    client.on('disconnect', () => { console.log('Cliente desconectado') });

    client.on('mensaje', (payload)=>{
      console.log('mensajeeee',payload);

      io.emit('mensaje',{admin: ' nuevo mensaje'})
    })


  });