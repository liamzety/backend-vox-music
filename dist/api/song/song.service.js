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
const db_1 = require("../../db");
exports.songService = {
    add,
    remove,
};
const SONG_TABLE = 'song';
function add(songData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, url, video_id, playlist_id } = songData;
        try {
            const newSong = yield db_1.pool.query(`
            INSERT INTO ${SONG_TABLE} 
            (title,url,video_id,playlist_id) VALUES ($1,$2,$3,$4) RETURNING *`, [title, url, video_id, playlist_id]);
            return newSong.rows[0];
        }
        catch (err) {
            throw err;
        }
    });
}
function remove(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = query;
        try {
            yield db_1.pool.query(`
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