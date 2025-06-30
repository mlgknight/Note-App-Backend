import { Router } from 'express';
import { addNewUser, getAllUsers } from '../controllers/user.controller.ts'


const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', addNewUser);








export default userRouter;
