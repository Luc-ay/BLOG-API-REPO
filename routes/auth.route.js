import express from 'express'
import upload from '../middlewares/picture.storage.middleware'

const router = express.Router()

router.post('/register', upload, registerController)

export default router
