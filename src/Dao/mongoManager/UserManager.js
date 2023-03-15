import { userModel } from "../models/users.model.js";

class UserManager {
  async createUser(user) {
    try {
      const { email, password } = user;
      const userExists = await userModel.find({ email, password });

      if (userExists.length !== 0) {
        const newUser = await userModel.create(user);
        return newUser;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const username = await userModel.find({ email, password });

      if (username.length !== 0) {
        return username;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserManager;
