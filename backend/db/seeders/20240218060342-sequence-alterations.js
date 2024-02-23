'use strict'

const path = require('path');;

module.exports = {
  async up (queryInterface, Sequelize) {
    const tables = ['users', 'languages', 'hobbies', 'userFriends', 'userMotherTongues', 'userHobbies', 'userLearningLanguages', 'chatrooms', 'chatroomUsers','messages'];  
      
    for (const table of tables) {  
      const result = await queryInterface.sequelize.query(`SELECT max(id) FROM "${table}"`);
      console.log(`${table}`,result)  
      const maxId = result[0][0].max || 0;  
      console.log(`${table} max id`,maxId)
      await queryInterface.sequelize.query(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH ${maxId + 1}`);  
    }  
  },  

  async down (queryInterface, Sequelize) {
    const tables = ['users', 'languages', 'hobbies', 'userFriends', 'userMotherTongues', 'userHobbies', 'userLearningLanguages', 'chatrooms', 'chatroomUsers','messages'];  
  
    for (const table of tables) {  
      await queryInterface.sequelize.query(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1`);  
    }  
  } 
};
