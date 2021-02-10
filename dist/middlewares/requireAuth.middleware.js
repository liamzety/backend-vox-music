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
exports.requireAuthMiddleware = void 0;
exports.requireAuthMiddleware = {
    requireAuth,
};
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log( req.headers.cookie.includes('userId'));
        console.log('req.cookies', req.cookies);
        try {
            if (!req.session || !req.session.user) {
                throw { message: 'You need to be logged in.' };
            }
            next();
        }
        catch (err) {
            console.error('Error, requireAuth.middleware.ts -> function: ', err.message);
            res.status(403).send({ message: err.message });
        }
    });
}
//# sourceMappingURL=requireAuth.middleware.js.map