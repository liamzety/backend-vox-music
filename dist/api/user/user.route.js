"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("./user.controller.js");
const router = express_1.default.Router();
const { addUser, removeUser, updateUser, getUser } = user_controller_js_1.userController;
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);
exports.userRoutes = router;
//# sourceMappingURL=user.route.js.map