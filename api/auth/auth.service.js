const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(user) {
    if (!user.email || !user.password) return Promise.reject('email and password are required!')
    const userFound = await userService.query(user.email)
    if (!userFound) return Promise.reject('Invalid email')
    const match = await bcrypt.compare(user.password.toString(), userFound.password)
    if (!match) return Promise.reject('Invalid password')

    delete user.password;
    return user;
}

async function signup(user) {
    if (!user.password || !user.email) return Promise.reject('email and password are required!')
    hash = await bcrypt.hash(user.password.toString(), saltRounds)
    return await userService.add({ ...user, password: hash })
}

module.exports = {
    signup,
    login,
}