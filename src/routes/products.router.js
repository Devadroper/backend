import { Router } from "express";
import ProductManager from "../Dao/container/ProductManager.js";
import { productModel } from "../Dao/models/products.model.js";

const prodRouter = new Router();

const path = new ProductManager("./src/Dao/db/product.json");

//  listar todos los prods
prodRouter.get("/", async (req, res) => {
  // const prods = await path.getProducts();
  // const { limit = 0 } = req.query; // '/products?limit=5'
  // // const limit = req.query.limit
  // if (limit === 0) {
  //   res.json(prods);
  // } else if (limit > prods.length) {
  //   res.json({ error: "Limit Exceeded" });
  // } else {
  //   let arr = [];
  //   prods.map((e, i) => {
  //     if (i < limit) arr.push(e);
  //   });
  //   res.json(arr);
  // }

  const products = await productModel.find({})
  if (products.length !== 0) {
    res.json({products})
  } else {
    res.send('No hay productos')
  }
});

// traer el prod seleccionado
prodRouter.get("/:pid", async (req, res) => {
  const params = req.params; // 'products/1' = SHREK ; 'products/10' = 'Not found'
  const prods = await path.getProductById(Number(params.pid));
  res.json(prods);
});

// agregar prod
prodRouter.post("/", async (req, res) => {
  const response = await path.addProduct(req.body);
  res.json(response)
  // if (response) {
  //   res.status(200).json({ message: "producto agregado", prod: req.body });
  // } else {
  //   res.json({ message: "error" });
  // }

  // Agregar con mongo mediante esquema
});

// actualizar prod seleccionado
prodRouter.put("/:pid", async (req, res) => {
  const id = req.params;
  const field = Object.keys(req.body).toString();
  const elem = Object.values(req.body).toString();
  const result = await path.updateProduct(Number(id.pid), field, elem);
  res.json(result);
});

// borrar prod seleccionado
prodRouter.delete("/:pid", async (req, res) => {
  const id = req.params;
  const result = await path.deleteProduct(Number(id.pid));
  res.json(result)
});

export default prodRouter;
