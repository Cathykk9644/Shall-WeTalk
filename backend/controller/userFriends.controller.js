const BaseController = require('./base.controller');

class UserFriendsController extends BaseController {
  constructor(db) {
    super();
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
}
module.exports = UserFriendsController;
