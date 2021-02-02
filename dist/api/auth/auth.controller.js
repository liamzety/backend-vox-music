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
const auth_service_js_1 = require("./auth.service.js");
exports.authController = {
    login,
    signup,
    logout
};
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield auth_service_js_1.authService.login(req.body);
            req.session.user = user;
            res.status(200).send(user);
        }
        catch (err) {
            console.log('err auth.controller', err);
            res.status(401).send({ msg: err.msg } || { err, msg: 'Something went wrong.' });
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield auth_service_js_1.authService.signup(req.body);
            const user = yield auth_service_js_1.authService.login(req.body);
            req.session.user = user;
            res.status(200).send(user);
        }
        catch (err) {
            console.log('err auth.controller', err);
            res.status(500).send({ msg: err.msg } || { err, msg: 'Something went wrong.' });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.session.destroy();
            res.status(200).send('Logged out successfully');
        }
        catch (err) {
            console.log('err auth.controller', err);
            res.status(500).send({ err, msg: 'Something went wrong.' });
        }
    });
}
//# sourceMappingURL=auth.controller.js.map