import express from "express"
import UsersController from './Users.controller.js'

const router = express.Router()

router
  .route('/login')
  .post(UsersController.apiLoginUser)

router
  .route("/register")
  .post(UsersController.apiRegisterUser) 

router
  .route('/delete')
  .delete(UsersController.apiDeleteUser)

export default router