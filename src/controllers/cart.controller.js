import CartManager from "../dao/repositories/mongoManager/CartManager.js";
import { logger } from "../utils/logger.js";

const cart = new CartManager();

/**
 * @swagger
 * tags:
 *   name: carts
 *   description: Operaciones relacionadas con carritos
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [carts]
 *     description: Crea un nuevo carrito.
 *     responses:
 *       200:
 *         description: Carrito creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al crear el carrito
 *
 * /api/carts/{cid}:
 *   get:
 *     summary: Obtener un carrito por su ID
 *     tags: [carts]
 *     description: Obtiene un carrito por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al obtener el carrito por ID
 *
 *   put:
 *     summary: Reemplazar un carrito por su ID
 *     tags: [carts]
 *     description: Reemplaza un carrito por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/components/schemas/CartUpdateRequest'
 *         description: Datos para reemplazar el carrito
 *     responses:
 *       200:
 *         description: Carrito reemplazado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al reemplazar el carrito
 *
 *   delete:
 *     summary: Eliminar un carrito por su ID
 *     tags: [carts]
 *     description: Elimina un carrito por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al eliminar el carrito
 *
 * /api/carts/{cid}/purchase:
 *   post:
 *     summary: Realizar la compra de un carrito
 *     tags: [carts]
 *     description: Realiza la compra de un carrito por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Compra realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseResult'
 *       500:
 *         description: Error al realizar la compra
 *
 * /api/carts/{cid}/empty:
 *   delete:
 *     summary: Vaciar un carrito
 *     tags: [carts]
 *     description: Vacia un carrito por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito vaciado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al vaciar el carrito
 *
 * /api/carts/{cid}/add/{pid}:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [carts]
 *     description: Agrega un producto al carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto a agregar
 *     responses:
 *       200:
 *         description: Producto agregado al carrito exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al agregar al carrito
 *
 * /api/carts/{cid}/remove/{pid}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [carts]
 *     description: Elimina un producto del carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al eliminar del carrito
 *
 * /api/carts/{cid}/quantity/{pid}:
 *   put:
 *     summary: Actualizar la cantidad de un producto en el carrito
 *     tags: [carts]
 *     description: Actualiza la cantidad de un producto en el carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         description: ID del carrito
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/components/schemas/QuantityUpdateRequest'
 *         description: Cantidad a actualizar del producto
 *     responses:
 *       200:
 *         description: Cantidad actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error al actualizar la cantidad
 */

export const createCart = async (req, res) => {
  try {
    const result = await cart.createCart();
    res.json(result);
  } catch (error) {
    logger.error("Error al crear el carrito:", error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export const getCart = async (req, res) => {
  try {
    const id = req.params.cid;
    console.log(id);
    const myCart = await cart.getCart(id);
    res.json(myCart);
  } catch (error) {
    logger.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

export const replaceCart = async (req, res) => {
  try {
    const params = req.params;
    const result = await cart.replaceCart(params.cid, req.body);
    res.json(result);
  } catch (error) {
    logger.error("Error al reemplazar el carrito:", error);
    res.status(500).json({ error: "Error al reemplazar el carrito" });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const params = req.params;
    const result = await cart.purchase(params.cid);
    res.json(result);
  } catch (error) {
    logger.error("Error al realizar la compra:", error);
    res.status(500).json({ error: "Error al realizar la compra" });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const params = req.params;
    const result = await cart.emptyCart(params.cid);
    res.json(result);
  } catch (error) {
    logger.error("Error al vaciar el carrito:", error);
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const params = req.params;
    const result = await cart.addToCart(params.cid, params.pid);
    res.json(result);
  } catch (error) {
    logger.error("Error al agregar al carrito:", error);
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const params = req.params;
    const result = await cart.removeFromCart(params.cid, params.pid);
    res.json(result);
  } catch (error) {
    logger.error("Error al eliminar del carrito:", error);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};

export const sumQuantity = async (req, res) => {
  try {
    const params = req.params;
    const { quantity } = req.body;
    const result = await cart.sumQuantity(params.cid, params.pid, quantity);
    res.json(result);
  } catch (error) {
    logger.error("Error al sumar la cantidad:", error);
    res.status(500).json({ error: "Error al sumar la cantidad" });
  }
};
