const BaseController = require('./base.controller');
const { Op } = require('sequelize');
class UserFriendsController extends BaseController {
  constructor(db) {
    super(db);
    this.db = db;
  }

  getAllFriends = async (req, res) => {
    const { userId } = req.body;

    try {
      const allFriends = await this.db.userFriends.findAll({
        where: { userId },
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
    //* todo: add check for user-friend relation prexisting and prevent adding duplicate
    const { userId, friendId, friendNickname, isAccepted } = req.body;
    const newFriend = {
      userId: userId,
      friendId: friendId,
      friendNickname: friendNickname,
      isAccepted: isAccepted,
    };

    try {
      await this.db.userFriends.create(newFriend);
      res.json(newFriend);
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
}
module.exports = UserFriendsController;
