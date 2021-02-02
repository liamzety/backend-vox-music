import express from 'express'
import { songController } from './song.controller.js'
const { addSong, removeSong } = songController

const router = express.Router()

router.post('/', addSong)
router.delete('/:id', removeSong)

export const songRoutes = router

