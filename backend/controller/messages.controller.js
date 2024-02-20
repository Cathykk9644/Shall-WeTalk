const BaseController = require('./base.controller');

class MessageController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  getMessages = async (req,res) =>{
    const {userId}=req.query;
    console.log(userId)
    try{
      const messages = await this.db.chatroomUsers.findAll({
        where:{userId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {
                model:this.db.messages,
              }
            ]
          }
        ]
      })
      const chatroomMessages = messages.reduce((result, current) => {  
        result[current.chatroom.id] = current.chatroom.messages;  
        return result;  
      }, {}); 

      res.status(200).json(
        chatroomMessages
      )   
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  createMessage = async (req,res) =>{
    const {chatroomId,senderId,messageText,messageType,voiceNoteFileUrl,voiceNoteDuration,voiceNoteSize,timestamp}=req.body;
    try{
      const newMessage = {
        chatroomId:chatroomId,
        senderId:senderId,
        messageText:messageText,
        messageType:messageType,
        voiceNoteFileUrl:voiceNoteFileUrl,
        voiceNoteDuration:voiceNoteDuration,
        voiceNoteSize:voiceNoteSize,
        timestamp:timestamp
      }

      const response = await this.db.messages.create(newMessage)
      res.json(newMessage)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }




}

module.exports = MessageController;
