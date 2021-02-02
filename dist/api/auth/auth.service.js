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
const user_service_js_1 = require("../user/user.service.js");
exports.authService = {
    signup,
    login,
};
const saltRounds = 10;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.email || !user.password)
            return Promise.reject({ msg: 'Email and Password are required!' });
        const userFound = yield user_service_js_1.userService.query({ email: user.email });
        if (!userFound)
            return Promise.reject({ msg: 'Invalid Email' });
        const match = yield bcrypt_1.default.compare(user.password.toString(), userFound.password);
        if (!match)
            return Promise.reject({ msg: 'Invalid Password' });
        delete userFound.password;
        return userFound;
    });
}
function signup(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.password)
            return Promise.reject({ msg: 'Password field is required.' });
        if (!user.email)
            return Promise.reject({ msg: 'Email field is required.' });
        if (!user.name)
            return Promise.reject({ msg: 'Name field is required.' });
        hash = yield bcrypt_1.default.hash(user.password.toString(), saltRounds);
        return yield user_service_js_1.userService.add(Object.assign(Object.assign({}, user), { password: hash }));
    });
}
//# sourceMappingURL=auth.service.js.map