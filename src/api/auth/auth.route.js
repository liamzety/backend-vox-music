import express from 'express'
// const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
import { authController } from './auth.controller.js'
const { login, signup, logout } = authController

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)


export const authRoutes = router
