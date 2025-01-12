import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body

    if (!firstName || !lastName || !email || !password || !occupation) {
      return res.status(400).json({
        Success: false,
        Message: 'Please fill all the fields',
      })
    }

    const verify = await User.findOne({ email })
    if (verify) {
      return res.status(400).json({
        Success: false,
        Message: 'Email already exist',
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ Msg: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ Msg: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    user.password = undefined
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
