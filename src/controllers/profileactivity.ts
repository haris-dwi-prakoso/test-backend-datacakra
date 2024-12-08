import { Request, Response } from 'express';
import { ProfileActivityService } from '../services/profileactivity';
import { UserService } from '../services/user';
import { CustomRequest } from '../middlewares/auth';
import ProfileActivity from '../db/models/profileactivity';
import moment from "moment";

const profileActivityService = new ProfileActivityService();
const userService = new UserService();

/**
 * Function to get user profile list, up to 10 - the number of profiles already
 * interacted with for the day.
 * @param req Request authorization header contains user data
 * @param res Response body contains list of user profile data
 */
export async function getTarget(req: CustomRequest, res: Response) {
    try {
        const userId = Number(req.token['id']);
        let todayActivityList = await profileActivityService.findAndCountTodayByUserId(userId);
        if (todayActivityList.count < 10) {
            let todayActivityTargetIdList = todayActivityList.rows.map(x => x.id);
            let limit = 10 - todayActivityList.count
            let nextTargets = await userService.getRandomNotInIds(todayActivityTargetIdList, limit);
            let result = nextTargets.map(x => JSON.parse(JSON.stringify(x)));
            res.status(200).json(result);
        } else res.status(403).json({ message: "User limit has been reached." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

/**
 * Function to register activity from one user to the target user.
 * @param req Request authorization header contains user data, body contains target user id and activity type
 * @param res Response body contains message of whether activity was successfully registered 
 */
export async function registerActivity(req: CustomRequest, res: Response) {
    try {
        const userId = Number(req.token['id']);
        const { targetUserId, activityType } = req.body;
        const date = moment().format('YYYY-MM-DD');
        // Check if user has already interacted with target or not
        let alreadyDoneActivity = await profileActivityService.targetAlreadyHasActivityToday(userId, targetUserId);
        if (!alreadyDoneActivity) {
            let newActivity = new ProfileActivity();
            newActivity.userId = userId;
            newActivity.date = date;
            newActivity.targetUserId = targetUserId;
            newActivity.activityType = activityType;
            let toInsert = JSON.parse(JSON.stringify(newActivity));
            let result = await profileActivityService.create(toInsert);
            if (result) res.status(201).json({ message: "Successfully registered activity." });
        } else res.status(403).json({ message: "User has already performed an action on this target." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}