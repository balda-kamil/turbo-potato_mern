import UsersDAO from "../dao/UsersDAO.js"

export default class UsersController {
  static async apiRegisterUser(req, res, next) {
    try {
      const _id = req.body.user_id
      const first_name = req.body.first_name
      const last_name = req.body.last_name
      const email = req.body.email
      const password = req.body.password
      const date = new Date()

      const UsersResponse = await UsersDAO.addUser(
        _id,
        first_name,
        last_name,
        email,
        password,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const userId = req.body._id
      const userDeleteResponse = await UsersDAO.deleteUser(
        userId,
      )

      if(userDeleteResponse.code === 200){
        res.status(200).json( userDeleteResponse.status )
      } else {
        res.status(userDeleteResponse.code).json( userDeleteResponse.status )
      }

    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiLoginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const loginResponse = await UsersDAO.loginUser(
        email,
        password
      )

      if(loginResponse.code === 200){
        res.status(200).send({
          auth_token: loginResponse.user.token,
          user: {
            email: loginResponse.user.email,
            _id: loginResponse.user._id,
            first_name: loginResponse.user.first_name,
            last_name: loginResponse.user.last_name,
          },
          code: 200
        })
      } else {
        res.status(loginResponse.code).send(loginResponse.status)
      }

    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}