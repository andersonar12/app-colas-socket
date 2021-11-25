var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});
// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

new Vue({
    el: "#app",
    data: {
        escritorio :''
    },
    mounted(){
        const urlParams = new URLSearchParams(window.location.search);

        if (!urlParams.has('escritorio')) {
            window.location = 'index.html'
            throw new Error('Escritorio es necesario')
        }

        this.escritorio = urlParams.get('escritorio')
        this.$refs.h1.innerText = `Escritorio ${this.escritorio}`
    },
    methods: {
        clickBtn() {
            socket.emit('atenderTicket',{place:this.escritorio},(resp) =>{

                if (resp === 'No hay tickets') {
                    alert(resp)
                    return
                }
                console.log('Siguiente Ticket: ', resp);
                this.$refs.small.innerText = `Ticket ${resp.number}`
             });
        }
    },

  });