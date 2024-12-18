import { Router } from 'express';
import * as userController from '../controllers/user';
import { auth } from '../middlewares/auth';

export const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
userRouter.get('/:id', auth, userController.getUser);
userRouter.put('/:id', auth, userController.updateUser);
userRouter.delete('/:id', auth, userController.deactivateUser);
userRouter.post('/verify/:id', auth, userController.verifyUser);