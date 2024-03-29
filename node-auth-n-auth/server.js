import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import config from './config/config.js'
import User from './models/user/User.js'
import 'dotenv/config'

// init express
const app = express()
// allow express to use json
app.use(express.json())

// dummy posts; we'll use a database in production
const posts = [
  { id: 1, username: 'foobertotest', title: 'Post 1 Hello World' },
  { id: 2, username: 'barberto', title: 'Post 2' },
  { id: 3, username: 'bazberta', title: 'Post 3' },
]

// user route; we won't want to expose this in production
app.get('/users', async (req, res) => {
  const users = await User.find().lean()
  res.json(users)
})

// post route;
// we'll use jwt to authenticate the user before allowing access to this route
app.get('/posts', authenticateToken, (req, res) => {
  console.log(req.user)
  res.json(posts.filter(post => post.username === req.user.username))
})

// user creation route
app.post('/users', async (req, res) => {
  const { username, email, password } = req.body
  try {
    // salt and hash the password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // create a new user
    const user = new User({ 
      username,
      email, 
      password: hashedPassword
    })
    await user.save()
    res.status(201).send('User created successfully')
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
})

// user login route
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).lean()
  if (user) {
    try {
      if (await bcrypt.compare(password, user.password)) {
        // authenticate via jwt
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.send({ accessToken })
      } else {
        res.send('Login failed')
      }
    } catch(err) {
      console.log(err)
      res.status(500).send('Error logging in')
    }
  } else {
    res.status(400).send('User not found')
  }
})

// jwt token authentication middleware
function authenticateToken(req, res, next) {
  // get the token from the header: "Bearer <token>"
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // if no token, send 401
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) // invalid token or expired token, send 403 
    req.user = user
    next()
  })
}

// connect to db and start server
try {
  const { host, port, name } = config.db
  const MONGOURI = `mongodb://${host}:${port}/${name}`
  const connection = await mongoose.connect(MONGOURI)
  if (connection) {
    console.log('[App] connected to database')
    const { port } = config.app
    app.listen(port, () => {
      console.info('[App] server is running on port:', port)
    })
  }
} catch(err) {
  console.error('[App] could not connect to DB', err)
}
