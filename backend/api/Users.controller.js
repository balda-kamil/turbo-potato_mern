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
}