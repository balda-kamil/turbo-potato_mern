import express from 'express'
import cors from 'cors'
import restaurants from './api/restaurants.route.js'
import users from './api/Users.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/restaurants', restaurants)

// Register User
app.post("/register", users)

// Login User
app.post("/login", users);

// Delete User
app.delete("/user", users);

app.use("*", (req, res) => {
  res.status(404).json({ error:  '404, not found'})
})



export default app