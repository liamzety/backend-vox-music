const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3030;
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// Express App Config
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'puki muki secret stuff',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

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


