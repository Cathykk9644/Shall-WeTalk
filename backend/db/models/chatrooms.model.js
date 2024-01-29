const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chatrooms extends Model {}
  chatrooms.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'chatrooms', // ! model name MUST match table name
    }
  );
  return Class;
};
