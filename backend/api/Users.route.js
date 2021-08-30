import express from "express"
import UsersController from './Users.controller.js'

const router = express.Router()

router
  .route("/register")
  .post(UsersController.apiRegisterUser)


export default router