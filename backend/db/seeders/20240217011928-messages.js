'use strict';
const path = require('path');

module.exports = {
  async up(queryInterface) {
    const messagesData = require(path.join(
      __dirname,
      '/seeder_jsons/messages.json'
    )).messages;
    const messages = messagesData.map((message) => ({
      ...message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('messages', messages, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('messages', null, {});
  },
};
