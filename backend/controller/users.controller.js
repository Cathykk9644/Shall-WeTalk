const BaseController = require('./base.controller');

class userController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  //* To Do

  getProfile = async (req, res) => {
    const  {userId}  = req.query
    console.log(userId);
    console.log(req.query);
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

  checkIfUserDetailsExist = async (req, res) => {
    const { username, email } = req.body;

    const doesEmailExistPromise = new Promise((resolve, reject) => {
      this.db.users
        .findOne({
          where: { email: email },
        })
        .then((result) => resolve(!!result)) // Convert result to a boolean
        .catch((error) => reject(error));
    });

    const doesUsernameExistPromise = new Promise((resolve, reject) => {
      this.db.users
        .findOne({
          where: { username: username },
        })
        .then((result) => resolve(!!result)) // Convert result to a boolean
        .catch((error) => reject(error));
    });

    try {
      const [isEmailUsed, isUsernameUsed] = await Promise.all([
        doesEmailExistPromise,
        doesUsernameExistPromise,
      ]);

      const EmailUsed = !!isEmailUsed;
      const usernameUsed = !!isUsernameUsed;

      res.json({
        email: EmailUsed,
        username: usernameUsed,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //* Modify User
  //* Delete User
}

module.exports = userController;
