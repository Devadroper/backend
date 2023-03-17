import { Router } from "express";
import UserManager from "../Dao/mongoManager/UserManager.js";

const sessionRouter = Router();
const userManager = new UserManager();

sessionRouter.get("/login", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    } else {
      // render desde router para borrar cookies, ni idea si esta bien pero funciona
      res.render("login")
    }
  });
});

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userManager.loginUser(req.body);

  if (user) {
    req.session.email = email;
    req.session.password = password;
    res.redirect(`/products/${user[0].id}`);
  } else {
    res.redirect("/errorLogin");
  }
});

sessionRouter.post("/signup", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/login");
  } else {
    res.redirect("/errorSignup");
  }

  //   const { user, pass } = req.body;
  //   req.session.user = user;
  //   req.session.pass = pass;
  //   res.json({ message: `Bienvenido ${user}` });
});

export default sessionRouter;
