const express = require('express')
const {
    addUser,
    removeUser, updateUser } = require('./user.controller')
const router = express.Router()

router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

module.exports = router

