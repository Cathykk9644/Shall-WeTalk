'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const userLearningLanguagesData = require(path.join(
      __dirname,
      '/seeder_jsons/user_learning_languages.json'
    )).user_learning_languages;
    const userLearningLanguages = userLearningLanguagesData.map(
      (userLearningLanguage) => ({
        ...userLearningLanguage,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await queryInterface.bulkInsert(
      'userLearningLanguages',
      userLearningLanguages,
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('userLearningLanguages', null, {});
  },
};
