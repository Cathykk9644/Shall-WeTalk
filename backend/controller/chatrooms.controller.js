const BaseController = require('./base.controller');
const Sequelize = require('sequelize');  
const Op = Sequelize.Op

class ChatroomController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  getChatrooms = async (req,res) =>{
    const {userId}=req.query;
    // console.log(userId)
    try{
      const chatrooms = await this.db.chatroomUsers.findAll({
        where:{userId},
      })
      const chatroomIds = chatrooms.map(chatroom=>chatroom.chatroomId)
      const usersInChatrooms = await this.db.chatroomUsers.findAll({  
        where: { chatroomId: { [Op.in]: chatroomIds } },  
        include: [  
          {  
            model: this.db.users
          }  
        ]  
      }); 
      const groupedUsers = usersInChatrooms.reduce((result, current) => {  
        // If the chatroom ID doesn't exist in the result yet, create an empty array for it.  
        if (!result[current.chatroomId]) {  
          result[current.chatroomId] = [];  
        }  
          
        // Add the current user to the appropriate chatroom.  
        result[current.chatroomId].push(current.user);  
          
        return result;  
      }, {});    
  

      res.status(200).json(
        groupedUsers
      )   
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  createChat = async (req,res) =>{
    const {userIds}=req.body;
    try{
      const chatroomId = await this.db.chatrooms.create({})
      const chatroomUsers = userIds.map(userId=>({
        userId: userId,
        chatroomId:chatroomId.id
      }))

      const response = await this.db.chatroomUsers.bulkCreate(chatroomUsers)
      res.json(chatroomUsers)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }

}

module.exports = ChatroomController;