"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
// const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const auth_controller_js_1 = require("./auth.controller.js");
const { login, signup, logout } = auth_controller_js_1.authController;
const router = express_1.default.Router();
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
exports.authRoutes = router;
//# sourceMappingURL=auth.route.js.map