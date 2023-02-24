import {Router} from "express";
import userController from "../controller/UserController";



export const userRouter = Router();
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
userRouter.get('/', userController.getAll);
userRouter.put('/lock/:id', userController.lock);