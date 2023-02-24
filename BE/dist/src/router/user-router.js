"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/login', UserController_1.default.login);
exports.userRouter.post('/signup', UserController_1.default.signup);
exports.userRouter.get('/', UserController_1.default.getAll);
exports.userRouter.put('/lock/:id', UserController_1.default.lock);
//# sourceMappingURL=user-router.js.map