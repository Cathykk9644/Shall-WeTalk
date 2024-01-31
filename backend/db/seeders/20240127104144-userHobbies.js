'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const userHobbiesData = require(path.join(
      __dirname,
      '/seeder_jsons/user_hobbies.json'
    )).user_hobbies;
    const userHobbies = userHobbiesData.map((userHobby) => ({
      ...userHobby,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('userHobbies', userHobbies, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('userHobbies', null, {});
  },
};
