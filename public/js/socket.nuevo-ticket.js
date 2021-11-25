var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


/* socket.on('estadoActual', null,(resp)=>{
  console.log(resp)
}) */



//Logica de Vue
new Vue({
  el: "#app",
  data: {
    ticketTitle: 'Cargando...'
  },
 created(){
    socket.on('estadoActual',({actual})=>{
      this.ticketTitle =`Ticket ${actual}`
    })
    console.log('Created Cycle')
  }/* ,
  beforeCreate() {
    console.log('No se ha ejecutado nada todavía')
  } */,
  methods: {
    clickBtn() {
      // Escuchar información
      socket.emit('siguienteTicket',null ,(resp) =>{
        console.log('Siguiente Ticket: ', resp.nroTicket);
        this.ticketTitle = resp.nroTicket
     });


    //Para manipular el DOM con vue usando Ref
    /*console.log(this.$refs.test); */
    
    },
  },
});