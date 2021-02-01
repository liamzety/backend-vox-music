const authService = require('./auth.service')

async function login(req, res) {
    try {
        const user = await authService.login(req.body)
        req.session.user = user;
        res.status(200).send(user)
    } catch (err) {
        console.log('err auth.controller', err)

        res.status(401).send({ msg: err.msg } || { err, msg: 'Something went wrong.' })
    }
}

async function signup(req, res) {
    try {
        await authService.signup(req.body)
        const user = await authService.login(req.body)
        req.session.user = user
        res.status(200).send(user)
    } catch (err) {
        console.log('err auth.controller', err)

        res.status(500).send({ msg: err.msg } || { err, msg: 'Something went wrong.' })
    }
}
async function logout(req, res) {
    try {
        req.session.destroy()
        res.status(200).send('Logged out successfully')
    } catch (err) {
        console.log('err auth.controller', err)

        res.status(500).send({ err, msg: 'Something went wrong.' })
    }
}

module.exports = {
    login,
    signup,
    logout
}