import { Router } from "express";
import CartManager from "../Dao/mongoManager/CartManager.js";

const apiCartRouter = new Router();
const newCart = new CartManager();

// Nuevo carrito
apiCartRouter.post("/", async (req, res) => {
  const result = await newCart.createCart();
  res.json(result);
});

// Listar prods
apiCartRouter.get("/:cid", async (req, res) => {
  const id = req.params;
  const cart = await newCart.getCart(id.cid);
  res.json(cart);
});

// actuliza el carrito por el array del body
apiCartRouter.put("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.replaceCart(params.cid, req.body)
  res.json(result);
});

// Elimina todo el array
apiCartRouter.delete("/:cid", async (req, res) => {
  const params = req.params;
  const result = await newCart.emptyCart(params.cid);
  res.json(result);
});

// Agregar prod al arr de prods dentro del carrito seleccionado
apiCartRouter.post("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.addToCart(params.cid, params.pid);
  res.json(result);
});

// Eliminar prods del array del carrito
apiCartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const result = await newCart.removeFromCart(params.cid, params.pid);
  res.json(result);
});

// actualiza la quantity
apiCartRouter.put("/:cid/product/:pid", async (req, res) => {
  const params = req.params;
  const { quantity } = req.body
  const result = await newCart.sumQuantity(params.cid, params.pid, quantity);
  res.json(result);
});
export default apiCartRouter;
