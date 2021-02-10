import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
import http from 'http';
const server = http.createServer(app);
import socketio from 'socket.io';
const io = socketio(server);

// Session Declaration merging
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

// Express App Config
app.use(bodyParser.json());
app.use(
  session({
    secret: 'voxing the vox in the box',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    //@ts-ignore
    httpOnly: true,
  })
);

const corsOptions = {
  origin: ['https://vox-music.netlify.app', 'http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

// @ts-ignore
import { userRoutes } from './api/user/user.route.js';
// @ts-ignore
import { authRoutes } from './api/auth/auth.route.js';
// @ts-ignore
import { playlistRoutes } from './api/playlist/playlist.route.js';
// @ts-ignore
import { songRoutes } from './api/song/song.route.js';
// @ts-ignore
import { connectSockets } from './api/socket/socket.routes.js';
// // routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/song', songRoutes);
connectSockets(io);

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
