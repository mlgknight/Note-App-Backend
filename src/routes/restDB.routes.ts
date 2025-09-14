import { Router } from 'express';
import { resetDB } from '../controllers/resetDB.controller.ts';

const resetDBRouter = Router();

resetDBRouter.post('/', resetDB);

export default resetDBRouter;
