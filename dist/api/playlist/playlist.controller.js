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
const playlist_service_1 = require("./playlist.service");
exports.playlistController = {
    getPlaylists,
    getPlaylist,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
};
// GET LIST
function getPlaylists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playlists = yield playlist_service_1.playlistService.query();
            res.send(playlists);
        }
        catch (err) {
            console.error('err, playlist.controller -> getPlaylists():', err.message);
            throw err;
        }
    });
}
// GET SINGLE
function getPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { playlist, playlistSongs } = yield playlist_service_1.playlistService.query({
                id,
            });
            res.status(200).send({ playlist, playlistSongs });
        }
        catch (err) {
            console.error('err, playlist.controller -> getPlaylist():', err.message);
            throw err;
        }
    });
}
// CREATE
function addPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, img, genre } = req.body;
            const newPlaylist = yield playlist_service_1.playlistService.create({
                name,
                description,
                img,
                genre,
            });
            res.send(newPlaylist);
        }
        catch (err) {
            console.error('err, playlist.controller -> addPlaylist():', err.message);
            throw err;
        }
    });
}
// UPDATE
function updatePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedPlaylist = playlist_service_1.playlistService.update({ id, name });
            res.send(updatedPlaylist);
        }
        catch (err) {
            console.error('err, playlist.controller -> updatePlaylist():', err.message);
            throw err;
        }
    });
}
// DELETE
function removePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield playlist_service_1.playlistService.remove({ id });
            res.send();
        }
        catch (err) {
            console.error('err, playlist.controller -> removePlaylist():', err.message);
            throw err;
        }
    });
}
//# sourceMappingURL=playlist.controller.js.map