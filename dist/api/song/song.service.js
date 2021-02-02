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
exports.songService = void 0;
const db_js_1 = require("../../db.js");
exports.songService = {
    add,
    query,
    update,
    remove
};
const SONG_TABLE = "song";
function query(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let users;
        try {
            if (email) {
                users = yield db_js_1.pool.query(`SELECT * FROM ${USER_TABLE} WHERE email = $1`, [email]);
                return (users.rows[0]);
            }
            else {
                users = yield db_js_1.pool.query(`SELECT * FROM ${USER_TABLE}`);
                return (users.rows);
            }
        }
        catch (err) {
            console.error('err from user.service:', err.message);
        }
    });
}
function add({ title, url, video_id, playlist_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSong = yield db_js_1.pool.query(`
            INSERT INTO ${SONG_TABLE} 
            (title,url,video_id,playlist_id) VALUES ($1,$2,$3,$4) RETURNING *`, [title, url, video_id, playlist_id]);
            return newSong.rows[0];
        }
        catch (err) {
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
            return (updatedUser.rows[0]);
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
function remove({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_js_1.pool.query(`
        DELETE FROM ${SONG_TABLE} WHERE _id=$1;
        `, [id]);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
//# sourceMappingURL=song.service.js.map