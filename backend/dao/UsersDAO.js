import mongodb from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ObjectId = mongodb.ObjectId;

let users

let passStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.USERS_NS).collection("users");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addUser(_id, first_name, last_name, email, password, date) {

    const emailDuplication = await users.findOne({email});
    if(emailDuplication){
      throw new Error('This email is already in our database, please log in')
    }

    if(!(passStrength.test(password))){
      throw new Error('Weak password, it must contains min 8 characters, one lowercase letter, one uppercase letter and one digit')
    }

    if (!(first_name && last_name && email && password)) {
      throw new Error('Fill all requiered fields')
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const token = jwt.sign({ user_id: _id, email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      console.log(token)

      try {
        const reviewDoc = {
          _id: ObjectId(),
          first_name,
          last_name,
          email: email.toLowerCase(),
          password: encryptedPassword,
          date,
          tokens: [token],
        };

        return await users.insertOne(reviewDoc);
      } catch (e) {
        console.error(`Unable to create user: ${e}`);
        return { error: e };
      }
    }
  }

  // static async updateUser(reviewId, userId, text, date) {
  //   try {
  //     const updateResponse = await users.updateOne(
  //       { user_id: userId, _id: ObjectId(reviewId)},
  //       { $set: { text: text, date: date  } },
  //     )

  //     return updateResponse
  //   } catch (e) {
  //     console.error(`Unable to update review: ${e}`)
  //     return { error: e }
  //   }
  // }

  // static async deleteUser(userId) {

  //   try {
  //     const deleteResponse = await users.deleteOne({
  //       user_id: userId,
  //     })

  //     return deleteResponse
  //   } catch (e) {
  //     console.error(`Unable to delete user: ${e}`)
  //     return { error: e }
  //   }
  // }
}
