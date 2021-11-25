const fs = require('fs');

class Ticket {
  constructor(number,place){
    this.number = number
    this.place = place
  }


}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = []
    this.lastFourth = []

    let data = require("../data/data.json");

    console.log(data);

    if (data.today === this.today) {
      this.last = data.last
      this.tickets = data.tickets
      this.lastFourth = data.lastFourth
    } else {
      this.restartCont();
    }
  }

  next(){
    this.last +=1
    let ticket = new Ticket(this.last,null)
    this.tickets.push(ticket)
    this.saveFile()
    return `Ticket ${this.last}`
  }

  getLastTicket(){
    return this.last
  }

  getLastFour(){
    return this.lastFourth
  }


  attendTicket(place){
    //place recibo el numero de escritorio
    //en este if revisamos si hay tickets pendientes de atender
    if (this.tickets.length == 0) { 
      return 'No hay tickets'
    }

    let numberTicket = this.tickets[0].number
    this.tickets.shift()

    //creamos el nuevo ticket que se va a atender
    let attendTicket = new Ticket(numberTicket, place)

    //agregamos ese ticket al inicio del arreglo
    this.lastFourth.unshift(attendTicket)


    //aqui verificamos que solo existan 4 elementos en ese arreglo
    if(this.lastFourth.length > 4){
      this.lastFourth.splice(-1,1)//borra el ultimo
    }

    console.log('Last Fourth:', this.lastFourth);

    this.saveFile()//grabamos el archivo

    return attendTicket

  }

  restartCont() {
    this.last = 0
    this.tickets =[]
    this.lastFourth = []
    this.saveFile()
  }

  saveFile(){
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets:this.tickets, 
      lastFourth: this.lastFourth
    };

    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);

  }
}

module.exports = {
  TicketControl,
};
