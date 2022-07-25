"use strict";
const USER_TABLE = "users";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      USER_TABLE,
      [
        {
          email: "example@example",
          password: "$2a$10$fcflreKgc9uJ3xeA.bqGCusx81jbf23xTRFwhoWL1HAgGENQvDvqy",
          user_name: "Jhon Doe",
          user_permission: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
