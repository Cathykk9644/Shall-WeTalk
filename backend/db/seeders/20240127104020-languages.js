'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const languagesData = require(path.join(
      __dirname,
      '/seeder_jsons/languages.json'
    )).languages;
    const languages = languagesData.map((language) => ({
      ...language,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('languages', languages, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('languages', null, {});
  },
};
