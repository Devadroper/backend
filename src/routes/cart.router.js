import { Router } from "express";
import {
  addToCart,
  createCart,
  emptyCart,
  getCart,
  removeFromCart,
  replaceCart,
  sumQuantity,
} from "../controllers/cart.controller.js";

const router = new Router();

// Nuevo carrito
router.post("/", createCart);

// Listar prods
router.get("/:cid", getCart);

// Actuliza el carrito por el array del body
router.put("/:cid", replaceCart);

// Elimina todo el array
router.delete("/:cid", emptyCart);

// Agregar prod al arr de prods dentro del carrito seleccionado
router.post("/:cid/product/:pid", addToCart);

// Actualiza la quantity
router.put("/:cid/product/:pid", sumQuantity);

// Eliminar prods del array del carrito
router.delete("/:cid/product/:pid", removeFromCart);

export default router;
