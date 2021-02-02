"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../user/user.service");
exports.authService = {
    signup,
    login,
};
const saltRounds = 10;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.email || !user.password) {
                throw { message: 'Email and Password are required!' };
            }
            const userFound = yield user_service_1.userService.query({ email: user.email });
            if (!userFound)
                throw { message: 'Invalid Email' };
            const match = yield bcrypt_1.default.compare(user.password.toString(), userFound.password);
            if (!match)
                throw { message: 'Invalid Password' };
            delete userFound.password;
            return userFound;
        }
        catch (err) {
            throw err;
        }
    });
}
function signup(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.password)
                throw { message: 'Password field is required.' };
            if (!user.email)
                throw { message: 'Email field is required.' };
            if (!user.name)
                throw { message: 'Name field is required.' };
            const hash = yield bcrypt_1.default.hash(user.password.toString(), saltRounds);
            return yield user_service_1.userService.add(Object.assign(Object.assign({}, user), { password: hash }));
        }
        catch (err) {
            throw err;
        }
    });
}
//# sourceMappingURL=auth.service.js.map