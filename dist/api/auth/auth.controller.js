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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
exports.authController = {
    login,
    signup,
    logout,
};
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield auth_service_1.authService.login(req.body);
            req.session.user = user;
            console.log('req.session.user', req.session.user);
            res.status(200).send(user);
        }
        catch (err) {
            console.error('err, auth.controller -> login():', err.message);
            res
                .status(401)
                .send({ message: err.message } || { err, message: 'Something went wrong.' });
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield auth_service_1.authService.signup(req.body);
            const user = yield auth_service_1.authService.login(req.body);
            req.session.user = user;
            res.status(200).send(user);
        }
        catch (err) {
            console.error('err, auth.controller -> signup():', err.message);
            res
                .status(500)
                .send({ message: err.message } || { err, message: 'Something went wrong.' });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.session.destroy((err) => {
                if (err)
                    console.log('err', err);
            });
            res.status(200).send('Logged out successfully');
        }
        catch (err) {
            console.error('err, auth.controller -> logout():', err.message);
            res.status(500).send({ err, message: 'Something went wrong.' });
        }
    });
}
//# sourceMappingURL=auth.controller.js.map