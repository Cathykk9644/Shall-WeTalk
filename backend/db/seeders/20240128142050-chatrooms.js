'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const chatroomsData = require(path.join(
      __dirname,
      '/seeder_jsons/chatrooms.json'
    )).chatroom;

    console.log(chatroomsData);
    const chatroomUsers = chatroomsData.map((chatroom) => ({
      ...chatroom,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('chatrooms', chatroomUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('chatrooms', null, {});
  },
};
