"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const blog_router_1 = require("./blog-router");
const comment_router_1 = require("./comment-router");
const like_router_1 = require("./like-router");
const user_router_1 = require("./user-router");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/blogs', blog_router_1.blogRouter);
exports.router.use('/comments', comment_router_1.commentRouter);
exports.router.use('/likes', like_router_1.likeRouter);
//# sourceMappingURL=router.js.map