'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProfileActivity.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    targetUserId: DataTypes.INTEGER,
    activityType: DataTypes.ENUM('PASS', 'LIKE')
  }, {
    sequelize,
    modelName: 'ProfileActivity',
  });
  return ProfileActivity;
};