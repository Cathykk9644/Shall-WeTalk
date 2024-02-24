
class MessageService {
  constructor(db){
    this.db = db;
  }
  
  async storeMessage (chatroomId,senderId,message){
    try{
      const newMessage = {
        chatroomId: chatroomId,
        senderId: senderId,
        messageText: message,
        messageType: "text",
        voiceNoteFileUrl: "",
        voiceNoteDuration: 0,
        voiceNoteSize: 0,
        timestamp: new Date()
      }
      const createdMessage = await this.db.messages.create(newMessage)
      return createdMessage.toJSON();
    }catch(err){
      console.log(err)
    }
  }

  messageSocketEvents(socket,id){
    socket.on('send-message', ({ chatroomId, recipients, message }) => {
      this.storeMessage(chatroomId,id,message); 
      recipients.filter(r=>r !==id).forEach(recipient => {
          const newRecipients = recipients.filter(r => r !== recipient)
          newRecipients.push(id)
          socket.broadcast.to(recipient).emit('receive-message', {
            chatroomId, recipients: newRecipients, senderId: id, message
          })
        })
      })
  }

}
module.exports = MessageService