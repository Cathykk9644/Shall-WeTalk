'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const userFriendsData = require(path.join(
      __dirname,
      '/seeder_jsons/user_friends.json'
    )).user_friends;
    const userFriends = userFriendsData.map((userFriend) => ({
      ...userFriend,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('userFriends', userFriends, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('userFriends', null, {});
  },
};
