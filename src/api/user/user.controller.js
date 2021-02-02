import { userService } from './user.service.js'
export const userController = {
    addUser,
    removeUser,
    updateUser,
    getUser
}

// GET
async function getUser(req, res) {
    try {
        const { id } = req.params
        const user = await userService.query({ id })
        res.status(200).send(user)
    } catch (err) {
        console.log('err user.controller', err)
        res.status(400).send({ err, msg: 'Something went wrong.' })

    }
}
// CREATE
async function addUser(req, res) {
    try {
        const newUser = await userService.add(req.body)
        res.status(200).send(newUser)
    } catch (err) {
        console.log('err user.controller', err)
        res.status(400).send({ err, msg: 'Something went wrong.' })

    }
}

// DELETE
async function removeUser(req, res) {
    try {
        const { id } = req.params
        await userService.remove(id)
        res.status(200).send('User Deleted Succusfully')
    } catch (err) {
        console.log('err user.controller', err)

        res.status(400).send({ err, msg: 'Something went wrong.' })

    }
}

// UPDATE
async function updateUser(req, res) {
    try {
        const { id } = req.params
        const user = req.body
        const userUpdated = await userService.update(id, user)
        res.status(200).send(userUpdated)
    } catch (err) {
        console.log('err user.controller', err)

        res.status(400).send({ err, msg: 'Something went wrong.' })

    }
}


