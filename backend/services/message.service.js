
class MessageService {
  constructor(db){
    this.db = db;
  }
  
  receiveTest(socket){
    socket.on("test-receive",(load)=>{
      console.log("Hello ",load)
      socket.emit("test-emit",{reply:"replying from Message service"})
    })
  }

}
module.exports = MessageService