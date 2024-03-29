const { ReceiptCutoff } = require("react-bootstrap-icons");

class MessageService {
  constructor(db){
    this.db = db;
  }
  
  async createChat (recipients){
    try{
      const chatroom = await this.db.chatrooms.create({});
      const chatroomUsers = recipients.map(userId=>(
         {
          userId,
          chatroomId: chatroom.id
        }
      ))
      const response = await this.db.chatroomUsers.bulkCreate(chatroomUsers)
      return chatroom.id
    }catch (err){
      console.log(err);
    }
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

  messageSocketEvents(socket,id,io){
    socket.on('send-message', ({ chatroomId, recipients, message }) => {
      this.storeMessage(chatroomId,id,message); 
      recipients.forEach(recipient => {    
        if (recipient === id){
          
        }else{
          io.to(`${recipient}`).except(id).emit('receive-message', {
            chatroomId, recipients: recipients, senderId: id, message
          })
        } 
        })
      })
    socket.on('send-new-message', async ({ recipients, message }) => {
      const chatroomId = await this.createChat(recipients)
      socket.emit('created-new-chat',{chatroomId:chatroomId,recipients,message})
      await this.storeMessage(chatroomId,id,message); 

      recipients.forEach(recipient => {    
        if (recipient === id){
          
        }else{
          io.to(`${recipient}`).except(id).emit('receive-message', {
            chatroomId, recipients: recipients, senderId: id, message
          })
        } 
        })
      })
  }

}
module.exports = MessageService