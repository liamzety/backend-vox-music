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
exports.playlistController = void 0;
const db_js_1 = require("../../db.js");
const PLAYLIST_TABLE = "playlist";
const SONG_TABLE = "song";
exports.playlistController = {
    getPlaylists,
    getPlaylist,
    addPlaylist,
    updatePlaylist,
    removePlaylist
};
// GET LIST
function getPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlists = yield db_js_1.pool.query(`SELECT * FROM ${PLAYLIST_TABLE}`);
            res.send(playlists.rows);
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
// GET SINGLE
function getPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let playlist = yield db_js_1.pool.query(`
        SELECT * FROM ${PLAYLIST_TABLE}
         WHERE _id = $1
         `, [id]);
            let playlistSongs = yield db_js_1.pool.query(`
        SELECT * FROM ${SONG_TABLE}
         WHERE playlist_id = $1
         `, [id]);
            playlist = playlist.rows[0];
            playlistSongs = playlistSongs.rows;
            res.status(200).send({ playlist, playlistSongs });
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
// CREATE
function addPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, img, genre } = req.body;
            const newPlaylist = yield db_js_1.pool.query(`
            INSERT INTO ${PLAYLIST_TABLE} 
            (name,description,img,genre) VALUES ($1,$2,$3,$4) RETURNING *`, [name, description, img, genre]);
            res.send(newPlaylist.rows[0]);
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
// UPDATE
function updatePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedPlaylist = yield db_js_1.pool.query(`
            UPDATE ${PLAYLIST_TABLE} SET name = $1
            WHERE _id = $2 RETURNING *
            `, [name, id]);
            res.send(updatedPlaylist.rows[0]);
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
// DELETE
function removePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield db_js_1.pool.query(`
            DELETE FROM ${PLAYLIST_TABLE} WHERE _id=$1;
            `, [id]);
            res.send();
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
//# sourceMappingURL=playlist.controller.js.map