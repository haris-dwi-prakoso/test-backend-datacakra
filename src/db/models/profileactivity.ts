'use strict';
import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import User from "./user";
import ActivityTypes from "../../enums/activitytypes";

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize: Sequelize) => {
//   interface ProfileActivityAttributes {
//     userId: number;
//     date: string;
//     targetUserId: number;
//     activityType: string
//   }
//   class ProfileActivity extends Model<ProfileActivityAttributes> implements ProfileActivityAttributes {
//     public userId!: number;
//     public date!: string;
//     public targetUserId!: number;
//     public activityType!: string
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models: any) {
//       // define association here
//     }
//   }
//   ProfileActivity.init({
//     userId: DataTypes.INTEGER,
//     date: DataTypes.DATEONLY,
//     targetUserId: DataTypes.INTEGER,
//     activityType: DataTypes.ENUM('PASS', 'LIKE')
//   }, {
//     sequelize,
//     modelName: 'ProfileActivity',
//   });
//   return ProfileActivity;
// };

interface ProfileActivityAttributes {
  id?: number;
  userId: number;
  date: string;
  targetUserId: number;
  activityType: ActivityTypes,
  createdAt?: Date,
  updatedAt?: Date
}

class ProfileActivity extends Model<ProfileActivityAttributes> implements ProfileActivityAttributes {
  public id!: number;
  public userId!: number;
  public date!: string;
  public targetUserId!: number;
  public activityType!: ActivityTypes;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    ProfileActivity.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    ProfileActivity.belongsTo(models.User, {
      as: 'targetUser',
      foreignKey: {
        name: 'targetUserId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
  }
}

ProfileActivity.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.NUMBER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: DataTypes.DATEONLY,
  targetUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activityType: DataTypes.ENUM('PASS', 'LIKE'),
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  }
}, {
  sequelize: connection,
  modelName: 'ProfileActivity',
});

export default ProfileActivity;