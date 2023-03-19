import { userModel } from "../models/users.model.js";
import { cartModel } from "../models/carts.model.js";

class UserManager {
  async createUser(user) {
    try {
      const { email } = user;
      const userExists = await userModel.find({ email });

      const cart = await cartModel.create({
        products: [],
      });

      if (userExists.length !== 0) {
        return null;
      } else {
        const newUser = await userModel.create({ ...user, role: "user", cart: cart._id });
        return newUser;
      }
    } catch (err) {
      console.log(err);
      return null
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

  async checkUser() {
    try {

    } catch (err) {

    }
  }
}

export default UserManager;
