import { Router } from "express";
import { generateToken } from "../utils.js";
import { userModel } from "../Dao/models/users.model.js";
import UserManager from "../Dao/mongoManager/UserManager.js";

const jwtRouter = Router()
const userManager = new UserManager()

jwtRouter.post('/login', async (req, res) => {
    // const { email, password } = req.body
    const user = await userManager.loginUser(req.body)
    if (user) {
        const token = generateToken(user)
        res.json({token})
    }
    res.json({ message: "Usuario no existente" })
})

export default jwtRouter