import { Router } from "express"
import CartManager from "../Dao/mongoManager/CartManager.js"

const views = Router()
const cartManager = new CartManager()

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

views.get("/cart/:id", async (req, res) => {
  res.render("cart", {cart: await cartManager.getCart(req.params.id) });
});

views.get("/products/:id", (req, res) => {
  res.render("products", { user: req.params.id });
});

// render desde session.router.js para borrar la cookie
// views.get("/login", (req, res) => {
//   res.render("login");
// });

views.get("/signup", (req, res) => {
  res.render("signup");
});

views.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

views.get("/errorSignUp", (req, res) => {
  res.render("errorSignup");
});

views.get("/perfil", (req, res) => {
  res.render("perfil");
});

export default views