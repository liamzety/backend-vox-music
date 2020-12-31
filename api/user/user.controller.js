const userService = require('./user.service')

async function getUsers(req, res) {
    const users = await userService.query()
    res.send(users)
}
async function addUser(req, res) {
    const user = await userService.add(req.body)
    res.send(user)
}


module.exports = {
    getUsers,
    addUser
};