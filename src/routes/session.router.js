import { Router } from "express";
import UserManager from "../Dao/mongoManager/UserManager.js";

const sessionRouter = Router();
const userManager = new UserManager();

sessionRouter.post("/singup", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/login")
  } else {
    res.redirect("/error")
  }
  //   const { user, pass } = req.body;
  //   req.session.user = user;
  //   req.session.pass = pass;
  //   res.json({ message: `Bienvenido ${user}` });
});

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await userManager.loginUser(req.body)

    if (user) {
        req.session.email = email
        req.session.password = password
        res.redirect('/perfil')
    } else {
        res.redirect('/errorLogin')
    }
  });

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      res.json({ message: "Hasta luego" });
    }
  });
});

export default sessionRouter;
