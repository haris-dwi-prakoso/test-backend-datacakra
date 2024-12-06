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
    return Promise.all([
      queryInterface.changeColumn(
        'ProfileActivities',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'ProfileActivities',
        'targetUserId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      )
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.changeColumn(
        'ProfileActivities',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.changeColumn(
        'ProfileActivities',
        'targetUserId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ]);
  }
};
