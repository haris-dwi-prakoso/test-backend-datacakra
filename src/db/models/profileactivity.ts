'use strict';
import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import ActivityTypes from "../../enums/activitytypes";

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