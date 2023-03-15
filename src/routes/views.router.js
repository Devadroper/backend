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

export default views