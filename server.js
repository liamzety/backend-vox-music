const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3030;
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// Express App Config
app.use(bodyParser.json())
app.use(session({
    secret: 'puki muki secret stuff',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const corsOptions = {
    origin: ['https://vox-music.netlify.app', 'http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));

const addPlaylistRoutes = require('./api/playlist/playlist.route')
// const authRoutes = require('./api/auth/auth.routes')
// const connectSockets = require('./api/socket/socket.routes')


// // routes
// app.use('/api/auth', authRoutes)
app.use('/api/playlist', addPlaylistRoutes)
// // connectSockets(io)


http.listen(port, () => {
    (`listening on http://localhost:${port}`)
})


