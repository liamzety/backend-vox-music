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
exports.userService = void 0;
const db_js_1 = require("../../db.js");
exports.userService = {
    add,
    query,
    update,
    remove,
};
const USER_TABLE = 'users';
function query(filterBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, id } = filterBy;
        let users;
        try {
            if (email) {
                users = yield db_js_1.pool.query(`SELECT * FROM ${USER_TABLE} WHERE email = $1`, [
                    email,
                ]);
                return users.rows[0];
            }
            else if (id) {
                users = yield db_js_1.pool.query(`SELECT * FROM ${USER_TABLE} WHERE _id = $1`, [
                    id,
                ]);
                return users.rows[0];
            }
            else {
                users = yield db_js_1.pool.query(`SELECT * FROM ${USER_TABLE}`);
                return users.rows;
            }
        }
        catch (err) {
            console.error('err, user.service -> query():', err.message);
            throw { message: 'Could not add user/s.' };
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, profile_img, email, password } = user;
        try {
            if (yield query({ email }))
                throw { message: 'This email is already registered.' };
            const newUser = yield db_js_1.pool.query(`
        INSERT INTO ${USER_TABLE} 
        (name,profile_img,email,password) VALUES ($1,$2,$3,$4) RETURNING *`, [name, profile_img, email, password]);
            return newUser.rows[0];
        }
        catch (err) {
            console.error('err, user.service -> add():', err.message);
            throw err;
        }
    });
}
function update(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield db_js_1.pool.query(`
            UPDATE ${USER_TABLE} SET name = $1 , profile_img = $2
            WHERE _id = $3 RETURNING *
            `, [user.name, user.profile_img, id]);
            return updatedUser.rows[0];
        }
        catch (err) {
            console.error('err, user.service -> update():', err.message);
            throw { message: 'Could not update user.' };
        }
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_js_1.pool.query(`
        DELETE FROM ${USER_TABLE} WHERE _id=$1;
        `, [id]);
            return;
        }
        catch (err) {
            console.error('err, user.service -> remove():', err.message);
            throw { message: 'Could not remove user.' };
        }
    });
}
//# sourceMappingURL=user.service.js.map