import express, { Router } from 'express';
import { addNewLogin } from '../controllers/login.controller.ts'

const loginRouter = Router();


loginRouter.post('/', addNewLogin)


export default loginRouter