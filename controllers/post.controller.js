import User from '../models/user.model.js'
import Post from '../models/post.model.js'

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })

    await newPost.save()
    const post = await Post.find()
    res.status(201).json(post)
  } catch (error) {
    res.status(409), json({ Msg: error.message })
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ Msg: error.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })
    if (!post) {
      return res.status(404).json({ Msg: 'User does not exist' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ Msg: error.message })
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json({ Msg: error.message })
  }
}
