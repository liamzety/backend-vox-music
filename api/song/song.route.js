const express = require('express')
const {
    addSong,
    removeSong } = require('./song.controller')
const router = express.Router()

router.post('/', addSong)
router.delete('/:id', removeSong)

module.exports = router

