import express from 'express'
import bcrypt from 'bcrypt'

// init express
const app = express()
// allow express to use json
app.use(express.json())

// dummy users; we'll use a database in production
const users = [
  { id: 1, username: 'fooberto', password: 'password' },
  { id: 2, username: 'barberto', password: '12345678' },
  { id: 3, username: 'bazberta', password: 'password123' },
] 

// user route; we won't want to expose this in production
app.get('/users', (req, res) => {
  res.json(users)
})

// user creation route
app.post('/users', async (req, res) => {
  const { username, password } = req.body
  try {
    const id = users.length + 1
    
    // salt and hash the password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    users.push({ id, username, password: hashedPassword })
    res.status(201).send('User created successfully')
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
})

// user login route
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  if (user) {
    try {
      if (await bcrypt.compare(password, user.password)) {
        res.send('Login successful')
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

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
