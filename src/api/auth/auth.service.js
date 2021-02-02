import bcrypt from 'bcrypt'
import { userService } from '../user/user.service.js'

export const authService = {
    signup,
    login,
}
const saltRounds = 10
async function login(user) {
    if (!user.email || !user.password) return Promise.reject({ msg: 'Email and Password are required!' })
    const userFound = await userService.query({ email: user.email })
    if (!userFound) return Promise.reject({ msg: 'Invalid Email' })
    const match = await bcrypt.compare(user.password.toString(), userFound.password)
    if (!match) return Promise.reject({ msg: 'Invalid Password' })

    delete userFound.password;
    return userFound;
}

async function signup(user) {
    if (!user.password) return Promise.reject({ msg: 'Password field is required.' })
    if (!user.email) return Promise.reject({ msg: 'Email field is required.' })
    if (!user.name) return Promise.reject({ msg: 'Name field is required.' })
    hash = await bcrypt.hash(user.password.toString(), saltRounds)
    return await userService.add({ ...user, password: hash })
}

