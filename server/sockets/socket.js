const { io } = require('../server');
const {TicketControl} = require('../class/ticket-control.js');

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

    client.on('siguienteTicket', (resp,callback)=> {
        
        callback({nroTicket : ticketControl.next()})

    });

    client.emit('estadoActual', {actual : ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour()})

    client.on('atenderTicket', (data,callback)=> {
        if (!data.place) {
            return callback({err:true, msg:'Field Place is missing'})
        }
        let atenderTicket = ticketControl.attendTicket(data.place)
        
        callback(atenderTicket)

        //Notificar cambios en los ultimos 4
        client.broadcast.emit('lastFour',{lastFour : ticketControl.getLastFour()})
        //emitir los ultimos 4
        
    });
})