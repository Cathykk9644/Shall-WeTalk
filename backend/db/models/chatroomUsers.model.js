const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chatroomUser extends Model {
    static associate(models) {
      this.belongsTo(models.chatrooms, { foreignKey: 'chatroomId' });
      this.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  chatroomUser.init(
    {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: DataTypes.INTEGER,
      },

      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      chatroomId: {
        allowNull: false,

        type: DataTypes.INTEGER,

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
  return chatroomUser;
};
