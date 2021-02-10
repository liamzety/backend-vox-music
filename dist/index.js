"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 3030;
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = __importDefault(require("socket.io"));
const io = socket_io_1.default(server);
// Express App Config
app.use(body_parser_1.default.json());
const sess = {
    secret: 'voxing the vox in the box',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use(express_session_1.default(sess));
const corsOptions = {
    origin: ['https://vox-music.netlify.app', 'http://localhost:3000'],
    credentials: true,
};
app.use(cors_1.default(corsOptions));
// @ts-ignore
const user_route_js_1 = require("./api/user/user.route.js");
// @ts-ignore
const auth_route_js_1 = require("./api/auth/auth.route.js");
// @ts-ignore
const playlist_route_js_1 = require("./api/playlist/playlist.route.js");
// @ts-ignore
const song_route_js_1 = require("./api/song/song.route.js");
// @ts-ignore
const socket_routes_js_1 = require("./api/socket/socket.routes.js");
// // routes
app.use('/api/user', user_route_js_1.userRoutes);
app.use('/api/auth', auth_route_js_1.authRoutes);
app.use('/api/playlist', playlist_route_js_1.playlistRoutes);
app.use('/api/song', song_route_js_1.songRoutes);
socket_routes_js_1.connectSockets(io);
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map