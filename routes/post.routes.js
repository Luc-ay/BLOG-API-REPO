import express from 'express'
import upload from '../middlewares/picture.storage.middleware.js'
import { verifyToken } from '../middlewares/auth.js'
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/post.controller.js'
const router = express.Router()

router.post('/', verifyToken, upload.single('picture'), createPost)
router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)
router.patch('/:id/like', verifyToken, likePost)

export default router
