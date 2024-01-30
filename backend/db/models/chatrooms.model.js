const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chatrooms extends Model {
    static associate(models) {
      this.hasMany(models.chatroomsUsers, { foreignKey: 'chatroomId' });
      this.hasMany(models.calls, { foreignKey: 'callerId' });
      this.hasMany(models.messages, { foreignKey: 'senderId' });
    }
  }
  chatrooms.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'chatrooms', // ! model name MUST match table name
    }
  );
  return Class;
};
