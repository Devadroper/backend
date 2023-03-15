import { Router } from "express"

const views = Router()

views.get("/", (req, res) => {
    res.render("home");
  });

views.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

views.get("/chat", (req, res) => {
  res.render("chat");
});

views.get("/products", (req, res) => {
  res.render("products");
});

views.get("/login", (req, res) => {
  res.render("login");
});

views.get("/signUp", (req, res) => {
  res.render("singUp");
});

views.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

views.get("/errorSignUp", (req, res) => {
  res.render("errorSignUp");
});

views.get("/perfil", (req, res) => {
  res.render("perfil");
});

export default views