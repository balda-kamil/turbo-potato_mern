import express from 'express'
import cors from 'cors'
import restaurants from './api/restaurants.route.js'
import users from './api/Users.route.js'
import auth from './middleware/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/restaurants', restaurants)

app.use("/user", users)

app.post("/welcome", auth, (req, res) => {
  console.log('WELCOME')
  res.status(200).send("Welcome 🙌 ");
});

app.use("*", (req, res) => {
  res.status(404).json({ error:  '404, not found'})
})


export default app