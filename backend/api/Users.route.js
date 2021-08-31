import express from "express"
import UsersController from './Users.controller.js'

const router = express.Router()

router
  .route("/register")
  .post(UsersController.apiRegisterUser)

router
  .route('/user')
  .delete(UsersController.apiDeleteUser)

router
  .route('/login')
  .post(UsersController.apiLoginUser)


export default router