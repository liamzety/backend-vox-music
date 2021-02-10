"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const playlist_controller_js_1 = require("./playlist.controller.js");
const { getPlaylists, getPlaylist, addPlaylist, updatePlaylist, removePlaylist, } = playlist_controller_js_1.playlistController;
const router = express_1.default.Router();
router.get('/', getPlaylists);
router.get('/:id', getPlaylist);
router.put('/:id', updatePlaylist);
router.post('/', addPlaylist);
router.delete('/:id', removePlaylist);
exports.playlistRoutes = router;
//# sourceMappingURL=playlist.route.js.map