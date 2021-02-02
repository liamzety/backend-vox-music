import express from 'express'
import { userController } from './user.controller.js'

const router = express.Router()

const { addUser,
    removeUser,
    updateUser,
    getUser } = userController

router.get('/:id', getUser)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

export const userRoutes = router

