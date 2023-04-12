import { Router } from "express";
import { addProd, deleteProd, getById, getProds, updateProd } from '../controllers/products.controller.js'

const prodRouter = new Router();

//  listar todos los prods
prodRouter.get("/", getProds);

// traer el prod seleccionado
prodRouter.get("/:pid", getById);

// agregar prod
prodRouter.post("/", addProd);

// actualizar prod seleccionado
prodRouter.put("/:pid", updateProd);

// borrar prod seleccionado
prodRouter.delete("/:pid", deleteProd);

export default prodRouter;
