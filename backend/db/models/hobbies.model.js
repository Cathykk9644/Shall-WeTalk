const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class hobbies extends Model {}
  hobbies.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      hobby: {
        allowNull: false,
        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'hobbies', // ! model name MUST match table name
    }
  );
  return Class;
};
