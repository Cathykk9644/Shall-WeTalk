const BaseController = require('./base.controller');

class userController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  //* To Do

  getProfile = async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    try {
      const profile = await this.db.users.findOne({
        where: { id: userId },
        attributes: ['username', 'email', 'bio', 'imageURL', 'userAddress'],
        include: [
          {
            model: this.db.userHobbies,
            include: [this.db.hobbies],
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
      res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  };

  //* Modify User
  //* Delete User
}

module.exports = userController;
