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

  userMotherTonguesUpdate = async (req,res) =>{
    const {userId,userMotherTongues}=req.body;
    try{
      await this.db.userMotherTongues.destroy({
        where:{userId}
      })
      // .bulkCreate 
      const newUserMotherTongues = userMotherTongues.map(userMotherTongue=>{
        return({
          userId,
          languageId:userMotherTongue.id
        })
      })
      
    // const existingRecord = await this.db.userMotherTongues.findOne({  
    //   where: { userId }  
    // });  
    // if (existingRecord){
    //   const response = await existingRecord.update({languageId})
    // }else{
    //   const response = await this.db.userMotherTongues.create(newMotherTongue)
    // }
      await this.db.userMotherTongues.bulkCreate(newUserMotherTongues)
      res.json(newUserMotherTongues)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  
  hobbiesUpdate = async (req,res) =>{
    const {userId,hobbies}=req.body;
    try{
      await this.db.userHobbies.destroy({
        where:{userId}
      })
      // .bulkCreate 
      const newHobbies = hobbies.map(hobby=>{
        return({
          userId,
          hobbyId:hobby.id
        })
      })
      
    // const existingRecord = await this.db.hobbies.findOne({  
    //   where: { userId }  
    // });  
    // if (existingRecord){
    //   const response = await existingRecord.update({languageId})
    // }else{
    //   const response = await this.db.hobbies.create(newHobbies)
    // }
      await this.db.userHobbies.bulkCreate(newHobbies)
      res.json(newHobbies)
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
  userLearningLanguagesUpdate = async (req,res) =>{
    const {userId,userLearningLanguages}=req.body;
    try{
      await this.db.userLearningLanguages.destroy({
        where:{userId}
      })
      // .bulkCreate 
      const newUserLearningLanguages = userLearningLanguages.map(userLearningLanguage=>{
        return({
          userId,
          languageId:userLearningLanguage.id,
          proficiency:userLearningLanguage.proficiency
        })
      })
      
    // const existingRecord = await this.db.userLearningLanguages.findOne({  
    //   where: { userId }  
    // });  
    // if (existingRecord){
    //   const response = await existingRecord.update({languageId})
    // }else{
    //   const response = await this.db.userLearningLanguages.create(newLearningL)
    // }
      await this.db.userLearningLanguages.bulkCreate(newUserLearningLanguages)
      res.json(newUserLearningLanguages)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }

  updateUser = async (req,res) =>{
      const {userId,username, address,bio}=req.body;
      // Construct an object to hold the fields to update  
      let updateFields = {};  
      
      // Check each parameter and add it to the updateFields object if it's provided  
      if (username !== undefined) {  
        updateFields.username = username;  
      }  
      if (address !== undefined) {  
        updateFields.address = address;  
      }  
      if (bio !== undefined) {  
        updateFields.bio = bio;  
      }  
      
      try {  
        // Perform the update only if there are fields to update  
        if (Object.keys(updateFields).length > 0) {  
          const result = await this.db.users.update(updateFields, {  
            where: { id: userId }  
          });  
      
          console.log(result[0] + ' rows were updated');  
      
          if (result[0] > 0) {  
            console.log('Update successful');  
          } else {  
            console.log('Update failed: No user found with the specified ID or no new information provided');  
          }  

          res.json(result)
        } else {  
          console.log('No fields provided for update');  
        }  
      }catch (err){
        console.log(err);
        throw new Error(err);
      }
    }
    

}

module.exports = UserProfileController;
