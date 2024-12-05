'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      }
    );
  }
};
