const BaseController = require('./base.controller');

class messageController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
  }

  getMessages = async (req,res) =>{
    const {senderId}=req.query;
    console.log(senderId)
    try{
      const messages = await this.db.messages.findAll({
        where:{senderId}
      })
      res.status(200).json(messages))
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
  createMessage = async (req,res) =>{
    const {userId}=req.query;
    try{
      const messages = await this.db.messages.create({
        where:{userId}

      })
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }




}

module.exports = messageController;
