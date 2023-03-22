import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userModel } from "../Dao/models/users.model.js";
import { cartModel } from "../Dao/models/carts.model.js";
import { hashPassword } from "../utils.js";

passport.use('singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userModel.findOne({email})
    if (user) {
        return done(null, false)
    } else {
        const hashNewPass = await hashPassword(password)
        const cart = await cartModel.create({
            products: [],
          });
          const newUser = await userModel.create({ ...req.body, password: hashNewPass, role: "user", cart: cart._id });
          done(null, newUser)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
})