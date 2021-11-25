var socket = io();

socket.on("connect", function () {
  console.log("Conectado al servidor");
});
// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

/* socket.on('estadoActual',(data)=>{
    console.log(data);
}) */

new Vue({
  el: "#app",
  data: {
    //...
  },
  mounted() {


    let lblTickets = [
      this.$refs.lblTicket1,
      this.$refs.lblTicket2,
      this.$refs.lblTicket3,
      this.$refs.lblTicket4,
    ];
    let lblEscritorios = [
      this.$refs.lblEscritorio1,
      this.$refs.lblEscritorio2,
      this.$refs.lblEscritorio3,
      this.$refs.lblEscritorio4,
    ];

    const updateHTML =(data)=>{
       for (let i = 0; i < data["lastFour"].length; i++) {
        lblTickets[i].innerText = `Ticket ${data["lastFour"][i]["number"]}`;
        lblEscritorios[i].innerText = `Escritorio ${data["lastFour"][i]["place"]}`;
      } 
    }

    socket.on("estadoActual", (data) => {
     /*  console.log(data); */
      updateHTML(data)
    });

    socket.on("lastFour", (data) => {
        /* console.log(data); */
        /* let audio = new Audio('audio/new-ticket.mp3')
        audio.play() */
        updateHTML(data)
    });
    /* this.$refs.h1.innerText = `Escritorio ${this.escritorio}` */
  },
});
