'use strict';
import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import ProfileActivity from "./profileactivity";

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize: Sequelize) => {
//   interface UserAttributes {
//     email: string;
//     password: string;
//     username: string;
//     profilePicture: string;
//     bio: string;
//     isVerified: boolean
//   }

//   class User extends Model<UserAttributes> implements UserAttributes {
//     public email!: string;
//     public password!: string;
//     public username!: string;
//     public profilePicture!: string;
//     public bio!: string;
//     public isVerified!: boolean;
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models: any) {
//       // define association here
//     }
//   }
//   User.init({
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     profilePicture: DataTypes.STRING,
//     bio: DataTypes.STRING,
//     isVerified: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  username: string;
  profilePicture?: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number | undefined;
  public email!: string;
  public password!: string;
  public username!: string;
  public profilePicture?: string | undefined;
  public bio?: string | undefined;
  public isVerified!: boolean;
  public isActive!: boolean;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;

  static associate(models: any) {
    // define association here
    User.hasMany(models.ProfileActivity, {
      as: 'profileActivity',
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
  }
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.NUMBER,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: DataTypes.STRING,
  bio: DataTypes.STRING,
  isVerified: DataTypes.BOOLEAN,
  isActive: DataTypes.BOOLEAN,
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
  modelName: 'User',
});

export default User;