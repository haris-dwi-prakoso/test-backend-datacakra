import User from "db/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { literal, Op } from "sequelize";

export class UserService {
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

    async findAllByFilter(filter: any) {
        try {
            let result = await User.findAll({
                where: filter
            });
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

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

    async create(data: any) {
        try {
            data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
            let result = await User.create(data);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    async update(data: any) {
        try {
            data.password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));
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