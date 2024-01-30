const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chatroomUser extends Model {
    static associate(models) {
      this.belongsToMany(models.chatroom, { foreignKey: chatroomId });
    }
  }
  chatroomUser.init(
    {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: sequelize.INTEGER,
      },

      userId: {
        allowNull: true,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      chatroomId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'chatrooms',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'chatroomUsers', // ! model name MUST match table name
    }
  );
  return Class;
};
