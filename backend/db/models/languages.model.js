const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    static associate(models) {
      this.hasOne(models.sessions);
      this.hasMany(models.userMotherTongues, { foreignKey: 'languageId' });
      this.hasMany(models.userLearningLanguages, { foreignKey: 'languageId' });
    }
  }
  language.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      language: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'languages', // ! model name MUST match table name
    }
  );
  return language;
};
