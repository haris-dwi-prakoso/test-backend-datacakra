import { Request, Response } from 'express';
import { ProfileActivityService } from 'services/profileactivity';
import { UserService } from 'services/user';
import { CustomRequest } from 'middlewares/auth';
import moment from "moment";

const profileActivityService = new ProfileActivityService();
const userService = new UserService();

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

export async function registerActivity(req: CustomRequest, res: Response) {
    try {
        const userId = Number(req.token['id']);
        const { targetUserId, activityType } = req.body;
        const date = moment().format('YYYY-MM-DD');
        let alreadyDoneActivity = await profileActivityService.targetAlreadyHasActivityToday(userId, targetUserId);
        if (!alreadyDoneActivity) {
            let result = await profileActivityService.create({
                userId: userId,
                date: date,
                targetUserId: targetUserId,
                activityType: activityType
            });
            if (result) res.status(200).json(result);
        } else res.status(403).json({ message: "User has already performed an action on this target." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}