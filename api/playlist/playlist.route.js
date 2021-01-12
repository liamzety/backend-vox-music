const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getPlaylists,
    getPlaylist,
    addPlaylist,
    updatePlaylist,
    removePlaylist } = require('./playlist.controller')
const router = express.Router()

router.get('/', getPlaylists)
router.get('/:id', getPlaylist)
router.put('/:id', updatePlaylist)
router.post('/', addPlaylist)
router.delete('/:id', removePlaylist)

module.exports = router


