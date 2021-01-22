const userService = require('./user.service')

module.exports = {
    addUser,
    removeUser,
    updateUser
}

// CREATE
async function addUser(req, res) {
    try {
        const newUser = await userService.add(req.body)
        res.status(200).send(newUser)
    } catch (err) {
        console.log('err', err)
        res.status(400).send('something went wrong.')
    }
}

// DELETE
async function removeUser(req, res) {
    try {
        const { id } = req.params
        await userService.remove(id)
        res.status(200).send('User Deleted Succusfully')
    } catch (err) {
        console.error(err.message)
        res.status(400).send('something went wrong.')
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
        console.error(err.message)
        res.status(400).send('something went wrong.')
    }
}


