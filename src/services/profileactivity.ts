import ProfileActivity from "db/models/profileactivity";
import moment from "moment";

export class ProfileActivityService {
    /**
     * Data access layer function to register activity
     * @param data activity data to insert
     * @returns inserted activity data
     */
    async create(data: any) {
        try {
            let result = await ProfileActivity.create(data);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to obtain list of user activity for the day alongside
     * activity count
     * @param userId user id to get list of user activity for
     * @returns list of user activity for the day with total rows
     */
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

    /**
     * Data access layer function to check if user and target already has a registered
     * activity for the day
     * @param userId user id
     * @param targetUserId target user id
     * @returns boolean value of whether user has interacted with the target for the day
     */
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