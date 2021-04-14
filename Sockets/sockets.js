//Mensajes de Sockets

const {io} = require('../index');






io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { console.log('Cliente desconectado') });

  // client.emit('active-bands', bands.getBands ());

    // client.on('mensaje', (payload)=>{
    //   console.log('mensajeeee',payload);

    //   io.emit('mensaje',{admin: ' nuevo mensaje'});

    // });
    // client.on('emitir-mensaje', payload => {
    //   io.emit('nuevo-mensaje', payload);
    // });
    
    // client.on('emit-message', (payload) => {
    //   console.log(payload);
    //   client.broadcast.emit('emit-message', payload)
    // })
    // client.on('vote-band', payload => {
    //   console.log(payload);
    //   bands.voteBand(payload.id);

    //   io.emit('active-bands', bands.getBands());
      
    // })

    // client.on('Add-band', payload => {
    //   const newBand = new Band(payload.name)
    //   bands.addBand(newBand);
    //   io.emit('active-bands', bands.getBands());
    // });

    // client.on('Delete-band',payload => {
    //   bands.deleteBand(payload.id);
    //   io.emit('active-bands', bands.getBands());
    // })
  });