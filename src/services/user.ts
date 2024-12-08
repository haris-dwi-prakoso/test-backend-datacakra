import User from "../db/models/user";
import ProfileActivity from '../db/models/profileactivity';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { literal, Op } from "sequelize";

User.hasMany(ProfileActivity, {
    as: 'profileActivity',
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    foreignKeyConstraint: true
});

export class UserService {
    /**
     * Data access layer function for login
     * @param email 
     * @param password 
     * @returns user email & username alongside authorization token
     */
    async login(email: string, password: string) {
        try {
            let matchUser = await User.findOne({
                where: { email: email }
            });
            if (matchUser) {
                let matchPass = bcrypt.compareSync(password, matchUser.password);
                if (matchPass) {
                    let token = jwt.sign({ id: matchUser.id, email: matchUser.email, username: matchUser.username }, process.env.SECRET_KEY);
                    return { user: { email: matchUser.email, username: matchUser.username }, token: token };
                } else return null;
            } else return null;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to get user data
     * @param id user id
     * @returns user data if found
     */
    async findOneById(id: number) {
        try {
            let result = await User.findOne({
                where: { id: id }
            });
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    /**
     * Data access layer function to find user by email
     * @param email 
     * @returns user data if found
     */
    async findOneByEmail(email: string) {
        try {
            let result = await User.findOne({
                where: { email: email }
            });
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    // async findAllByFilter(filter: any) {
    //     try {
    //         let result = await User.findAll({
    //             where: filter
    //         });
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //         throw e;
    //     }
    // };

    /**
     * Data access layer function to get list of active users excluding specified user ids
     * @param ids user ids to exclude
     * @param limit number of users to get
     * @returns user data list
     */
    async getRandomNotInIds(ids: number[], limit: number) {
        try {
            let result = await User.findAll({
                order: literal('random()'),
                where: {
                    id: {
                        [Op.notIn]: ids
                    },
                    isActive: true
                },
                limit: limit
            });
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to create user
     * @param data user data to insert
     * @returns inserted user data
     */
    async create(data: any) {
        try {
            // Hash password before inserting
            data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            let result = await User.create(data);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    /**
     * Data access layer function to update user data
     * @param data user data to update
     * @returns update result
     */
    async update(data: any) {
        try {
            // If password field is not null or undefined hash new password before updating
            if (data.password != null || data.password != undefined) data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            // Else delete password key to avoid updating password to null or undefined
            else delete data.password;
            let result = await User.update(
                data,
                {
                    where: { id: data.id }
                }
            )
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    /**
     * Data access layer function to deactivate user
     * @param id user id to deactivate
     * @returns update result
     */
    async deactivate(id: number) {
        try {
            let result = await User.update(
                {
                    isActive: false
                },
                {
                    where: { id: id }
                }
            )
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}