const express = require('express')
const {
    addUser,
    removeUser,
    updateUser,
    getUser } = require('./user.controller')
const router = express.Router()

router.get('/:id', getUser)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

module.exports = router

