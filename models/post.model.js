import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      reqiured: true,
    },
    firstNama: {
      type: String,
      reqiured: true,
    },
    lastName: {
      type: String,
      reqiured: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
