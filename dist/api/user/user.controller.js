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
exports.userController = void 0;
const user_service_js_1 = require("./user.service.js");
exports.userController = {
    addUser,
    removeUser,
    updateUser,
    getUser,
};
// GET
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield user_service_js_1.userService.query({ id });
            res.status(200).send(user);
        }
        catch (err) {
            console.error('err, user.controller -> getUser():', err.message);
            res.status(400).send({ err, message: 'Something went wrong.' });
        }
    });
}
// CREATE
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield user_service_js_1.userService.add(req.body);
            res.status(200).send(newUser);
        }
        catch (err) {
            console.error('err, user.controller -> addUser():', err.message);
            res.status(400).send({ err, message: 'Something went wrong.' });
        }
    });
}
// DELETE
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield user_service_js_1.userService.remove(id);
            res.status(200).send('User Deleted Succusfully');
        }
        catch (err) {
            console.error('err, user.controller -> removeUser():', err.message);
            res.status(400).send({ err, message: 'Something went wrong.' });
        }
    });
}
// UPDATE
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = req.body;
            const userUpdated = yield user_service_js_1.userService.update(id, user);
            res.status(200).send(userUpdated);
        }
        catch (err) {
            console.error('err, user.controller -> updateUser():', err.message);
            res.status(400).send({ err, message: 'Something went wrong.' });
        }
    });
}
//# sourceMappingURL=user.controller.js.map