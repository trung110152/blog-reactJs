import {Router} from "express";
import {blogRouter} from "./blog-router";
import {commentRouter} from "./comment-router";
import {likeRouter} from "./like-router";
import {userRouter} from "./user-router";



export const router = Router();
router.use('/users', userRouter);
router.use('/blogs', blogRouter);
router.use('/comments', commentRouter)
router.use('/likes', likeRouter)