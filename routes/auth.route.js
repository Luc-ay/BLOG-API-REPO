import express from 'express'
import upload from '../middlewares/picture.storage.middleware.js'
import { registerController } from '../controllers/register.controller.js'

const router = express.Router()

router.post('/register', upload.single('picture'), registerController)

export default router
