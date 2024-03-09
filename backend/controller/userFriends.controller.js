const BaseController = require('./base.controller');
const { Op } = require('sequelize');
class UserFriendsController extends BaseController {
  constructor(db) {
    super(db);
    this.db = db;
  }

  getAllFriends = async (req, res) => {
    const { userId } = req.query;
    // console.log(req.query)
    try {
      const allFriends = await this.db.userFriends.findAll({
        where: { userId },
        include:[
          {
            model:this.db.users,
            foreignKey:'friendId',
            as:'friend',
          }
        ]
      });
      res.json(allFriends);
    } catch (error) {
      console.log(error);
    }
  };

  removeFriend = async (req, res) => {
    const { userId, userFriendId, friendNickname } = req.body;
    try {
      const where = { userId };
      if (userFriendId !== undefined || friendNickname !== undefined) {
        where[Op.or] = [];
        if (userFriendId !== undefined) {
          where[Op.or].push({ userFriendId });
        }
        if (friendNickname !== undefined) {
          where[Op.or].push({ friendNickname });
        }
      }
      const removeFriends = await this.db.userFriends.destroy({ where });
      res.json(removeFriends);
    } catch (error) {
      console.log(error);
    }
  };

  addFriend = async (req, res) => {
    

    const { userId, friendId, friendNickname, isAccepted } = req.body;

    const doesRelationExist = await this.db.userFriends.findOne({
      where: { userId: userId, friendId: friendId },
    });

    const relationExists = !!doesRelationExist;

    try {
      if (!relationExists) {
        const newFriend = {
          userId: userId,
          friendId: friendId,
          friendNickname: friendNickname,
          isAccepted: isAccepted,
        };

        await this.db.userFriends.create(newFriend);
        res.json(newFriend);
      }
      res.json('Relation already exists');
    } catch (error) {
      console.log(error);
    }
  };

  changeFriendNickName = async (req, res) => {
    const { userId, friendId, newNickname } = req.body;
    try {
      await this.db.userFriends.update(
        { friendNickname: newNickname },
        { where: { userId: userId, friendId: friendId } }
      );
      res.json('Nickname successfully changed');
    } catch (error) {
      console.log(error);
    }
  };


  getSuggestedFriends = async (req, res) => {
    const { userId } = req.query;
    // console.log(req.query)
    //currently only matching learning languages to users' mother tongue
    //eventually need a ranking matrix to create the suggested friends
    try {
      const profile = await this.db.users.findOne({
        where: { id: userId },
        attributes: ['username', 'email', 'bio', 'imageURL', 'userAddress'],
        include: [
          {
            model: this.db.hobbies,
            through: this.db.userHobbies,
          },
          {
            model: this.db.userMotherTongues,
            include: [this.db.languages],
          },
          {
            model: this.db.userLearningLanguages,
            include: [this.db.languages],
          },
        ],      
      });
      
      console.log("profile:",profile)

      if (!profile) {  
        return res.status(404).json({ message: 'User not found' });  
      }  
  
      const learningLanguages = profile.userLearningLanguages.map(userLearningLanguage=>userLearningLanguage.language.id)
      
      if (learningLanguages.length === 0) {  
        return res.status(404).json({ message: 'No learning languages found for user' });  
      }  

      // Fetch the user's current friends' IDs  
      const friends = await this.db.userFriends.findAll({  
        where: { userId },
        include:[
          {
            model:this.db.users,
            foreignKey:'friendId',
            as:'friend',
          }
        ]
      });  
      console.log("Friends:",friends)
      const friendIds = friends.map(friend => friend.friendId); 
      
      const suggestedFriends = await this.db.users.findAll({
        where: {  
          id: {  
            [Op.notIn]: friendIds, // Exclude these user IDs  
            [Op.ne]: userId, // Also exclude the current user's ID  
          }  
        }, 
        include:[
        {
          model:this.db.userMotherTongues,
          include: [this.db.languages],
          where: { languageId: { [Op.in]: learningLanguages } },
        },
        {
          model: this.db.hobbies,
          through: this.db.userHobbies,
        },
        {
          model: this.db.userLearningLanguages,
          include: [this.db.languages],
        },
        ]
      });
      
      if (learningLanguages.length === 0) {  
        return res.status(404).json({ message: 'No match found for user' });  
      } 

      const formattedSuggestedFriend = suggestedFriends.map((suggestedFriend)=>{
        const userMotherTongues = suggestedFriend.userMotherTongues.map((userMotherTongue)=>{
          return (
            {
              id:userMotherTongue.language.id ,
              language:userMotherTongue.language.language
            }
          )})
        const userLearningLanguages = suggestedFriend.userLearningLanguages.map((userLearningLanguage)=>{
          return(
            {
              id:userLearningLanguage.language.id,
              language:userLearningLanguage.language.language,
              proficiency:userLearningLanguage.proficiency
            }
          )
        })
        const hobbies = suggestedFriend.hobbies.map((hobby)=>{
          return(
            {
              id:hobby.id,
              hobby:hobby.hobby
            }
          )
        })
        return (
          {
            id:suggestedFriend.id,
            name:suggestedFriend.username,
            imageURL:suggestedFriend.imageURL,
            userMotherTongues,
            userLearningLanguages,
            hobbies
          }
        )
      })
      res.json(formattedSuggestedFriend);
      // res.json(profile);
    } catch (error) {
      console.log(error);
    }
  };
}



module.exports = UserFriendsController;
