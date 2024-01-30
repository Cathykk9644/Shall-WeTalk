const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class languages extends Model {
    static associate(models) {
      this.hasOne(models.sessions);
      this.hasMany(models.userMotherTongues, { foreignKey: 'languageId' });
    }
  }
  languages.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      language: {
        allowNull: false,
        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'languages', // ! model name MUST match table name
    }
  );
  return Class;
};