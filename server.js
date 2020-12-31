const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

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

const authRoutes = require('./api/auth/auth.routes')
const addTemplateRoutes = require('./api/template/template.route')
const addUserRoutes = require('./api/user/user.route')
// const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/template', addTemplateRoutes)
app.use('/api/user', addUserRoutes)
// connectSockets(io)

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

http.listen(port, () => {
    (`listening on http://localhost:${port}`)
})


