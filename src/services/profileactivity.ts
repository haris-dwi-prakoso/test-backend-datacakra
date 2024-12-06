import ProfileActivity from "../db/models/profileactivity";
import moment from "moment";

export class ProfileActivityService {
    async create(data: ProfileActivity) {
        try {
            let result = await ProfileActivity.create(data);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async findAndCountTodayByUserId(userId: number) {
        try {
            let result = await ProfileActivity.findAndCountAll({
                where: {
                    userId: userId,
                    date: moment().format('YYYY-MM-DD')
                }
            });
            return result
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async targetAlreadyHasActivityToday(userId: number, targetUserId: number) {
        try {
            let result = await ProfileActivity.findOne({
                where: {
                    userId: userId,
                    targetUserId: targetUserId,
                    date: moment().format('YYYY-MM-DD')
                }
            });
            if (result) return true;
            else return false;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}