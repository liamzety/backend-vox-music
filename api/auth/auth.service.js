const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(user) {
    if (!user.email || !user.password) return Promise.reject('Email and Password are required!')
    const userFound = await userService.query({ email: user.email })
    if (!userFound) return Promise.reject('Invalid Email')
    const match = await bcrypt.compare(user.password.toString(), userFound.password)
    if (!match) return Promise.reject('Invalid Password')

    delete userFound.password;
    return userFound;
}

async function signup(user) {
    if (!user.password) return Promise.reject('Password field is required.')
    if (!user.email) return Promise.reject('Email field is required.')
    if (!user.name) return Promise.reject('Name field is required.')
    hash = await bcrypt.hash(user.password.toString(), saltRounds)
    return await userService.add({ ...user, password: hash })
}

module.exports = {
    signup,
    login,
}