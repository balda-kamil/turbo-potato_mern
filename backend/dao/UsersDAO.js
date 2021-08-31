import mongodb from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

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

      try {
        const reviewDoc = {
          _id: uuidv4(),
          first_name,
          last_name,
          email: email.toLowerCase(),
          password: encryptedPassword,
          date,
          token: token,
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

  static async deleteUser(userId) {
    try {
      const deleteResponse = await users.deleteOne({
        _id: userId,
      })

      if(deleteResponse.deletedCount){
        return { status: "User deleted", code: 200 }
      } else {   
        return { status: "The user with the given ID was not found", code: 404 }
      }  

    } catch (e) {
      throw new Error("error, sth went wrong...")
    }
  }

  static async loginUser(email, password) {
    try {
      if(!(email && password)){
        return { status: "All input is required", code: 400 }
      }

      const user = await users.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return { status: "Login OK", code: 200, user }
      }

      return {status: "invalid Credentials", code: 400}

    } catch (e) {
      console.log(e)
      throw new Error("error, sth went wrong...")
    }
  }
}
