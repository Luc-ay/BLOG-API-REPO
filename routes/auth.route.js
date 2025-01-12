import express from 'express'
import upload from '../middlewares/picture.storage.middleware.js'
import {
  loginController,
  registerController,
} from '../controllers/register.controller.js'

const router = express.Router()

router.post('/register', upload.single('picture'), registerController)
router.post('/login', loginController)

export default router
