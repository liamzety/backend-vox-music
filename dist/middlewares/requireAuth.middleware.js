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
    requireAdmin,
};
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.session || !req.session.user) {
            res.status(401).end('Unauthorized!');
            return;
        }
        next();
    });
}
function requireAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.session.user;
        if (!user.isAdmin) {
            res.status(403).end('Unauthorized Enough..');
            return;
        }
        next();
    });
}
//# sourceMappingURL=requireAuth.middleware.js.map