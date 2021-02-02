"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRoutes = void 0;
const express_1 = __importDefault(require("express"));
const song_controller_js_1 = require("./song.controller.js");
const { addSong, removeSong } = song_controller_js_1.songController;
const router = express_1.default.Router();
router.post('/', addSong);
router.delete('/:id', removeSong);
exports.songRoutes = router;
//# sourceMappingURL=song.route.js.map