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
exports.songController = void 0;
const song_service_js_1 = require("./song.service.js");
exports.songController = {
    addSong,
    removeSong
};
// CREATE
function addSong(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSong = yield song_service_js_1.songService.add(req.body);
            res.status(200).send(newSong);
        }
        catch (err) {
            console.error(err.message);
            res.status(400).send(err);
        }
    });
}
// DELETE
function removeSong(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield song_service_js_1.songService.remove(req.params);
            res.status(200).send();
        }
        catch (err) {
            console.error(err.message);
            res.status(400).send(err);
        }
    });
}
//# sourceMappingURL=song.controller.js.map