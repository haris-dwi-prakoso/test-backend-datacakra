import { Router } from 'express';
import * as profileActivityController from '../controllers/profileactivity';
import { auth } from '../middlewares/auth';

export const profileActivityRouter = Router();

profileActivityRouter.get('/next', auth, profileActivityController.getTarget);
profileActivityRouter.post('/action', auth, profileActivityController.registerActivity);