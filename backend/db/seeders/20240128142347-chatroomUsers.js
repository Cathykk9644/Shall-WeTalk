'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const chatroomUsersData = require(path.join(
      __dirname,
      '/seeder_jsons/chatroom_users.json'
    )).chatroom_users;

    console.log(chatroomUsersData);
    const chatroomUsers = chatroomUsersData.map((chatroomUser) => ({
      ...chatroomUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('chatroomUsers', chatroomUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('chatroomUsers', null, {});
  },
};
