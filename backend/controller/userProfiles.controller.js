const BaseController = require('./base.controller');

class UserProfileController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  getUserProfiles = async (req,res) =>{
    const {userId}=req.query;
    // console.log(userId)
    try{
      const UserProfiles = await this.db.chatroomUsers.findAll({
        where:{userId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {
                model:this.db.UserProfiles,
              }
            ]
          }
        ],
        order: [[this.db.chatrooms, this.db.UserProfiles, 'timestamp', 'ASC']]
      })
      const chatroomUserProfiles = UserProfiles.reduce((result, current) => {  
        result[current.chatroom.id] = current.chatroom.UserProfiles;  
        return result;  
      }, {}); 

      res.status(200).json(
        chatroomUserProfiles
      )   
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }

  addMotherTongue = async (req,res) =>{
    const {userId,languageId}=req.body;
    try{
      const newMotherTongue = {
        userId,
        languageId
      }

      const response = await this.db.userMotherTongues.create(newMotherTongue)
      res.json(newMotherTongue)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  addMotherTongue = async (req,res) =>{
    const {userId,languageId}=req.body;
    try{
      const newMotherTongue = {
        userId,
        languageId
      }

      const response = await this.db.userMotherTongues.create(newMotherTongue)
      res.json(newMotherTongue)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  addMotherTongue = async (req,res) =>{
    const {userId,languageId}=req.body;
    try{
      const newMotherTongue = {
        userId,
        languageId
      }

      const response = await this.db.userMotherTongues.create(newMotherTongue)
      res.json(newMotherTongue)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  addLearningLanguage = async (req,res) =>{
    const {userId,languageId,proficiency}=req.body;
    try{
      const newLearningLanguage = {
        userId,
        languageId,
        proficiency
      }

      const response = await this.db.userLearningLanguages.create(newLearningLanguage)
      res.json(newLearningLanguage)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }




}

module.exports = UserProfileController;
