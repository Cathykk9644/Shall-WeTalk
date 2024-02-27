const BaseController = require('./base.controller');

class UserHobbiesController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  addUserHobbies = async (req, res) => {
    //* add check for hobbys that user already has.

    
    const { userId, hobbyIds } = req.body;
    try {
      if ((hobbyIds.length = 0)) {
        return;
      } else {
        const hobbyEntries = hobbyIds.map((hobbyId) => {
          return {
            userId: userId,
            hobbyId: hobbyId,
          };
        });

        this.db.userHobbies.bulkCreate(hobbyEntries);
      }
    } catch (error) {
      console.log(error)
    }
  };
}
