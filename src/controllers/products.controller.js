import ProductManager from "../dao/repositories/mongoManager/ProductManager.js";
import { faker } from "@faker-js/faker";
import { logger } from "../utils/logger.js";

/**
 * @swagger
 * tags:
 *   name: products
 *   description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos paginados
 *     tags: [products]
 *     description: Obtén todos los productos paginados.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrar productos por título
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de productos por página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: desc
 *     responses:
 *       200:
 *         description: Lista de productos paginados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductPaginationResponse'
 *       500:
 *         description: Error al obtener los productos
 *
 * /api/products/{pid}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [products]
 *     description: Obtén un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al obtener el producto por ID
 *
 *   put:
 *     summary: Actualizar un producto por su ID
 *     tags: [products]
 *     description: Actualiza un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/components/schemas/ProductUpdateRequest'
 *         description: Datos a actualizar del producto
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al actualizar el producto
 *
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags: [products]
 *     description: Elimina un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al eliminar el producto
 *
 * /api/products/mocking:
 *   get:
 *     summary: Generar datos falsos de productos
 *     tags: [products]
 *     description: Genera datos falsos de productos.
 *     responses:
 *       200:
 *         description: Datos falsos generados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FakeProductData'
 *       500:
 *         description: Error al generar datos falsos
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         code:
 *           type: string
 *         stock:
 *           type: number
 *         category:
 *           type: string
 *     ProductPaginationResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         payload:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         totalPages:
 *           type: number
 *         prevPage:
 *           type: number
 *         nextPage:
 *           type: number
 *         page:
 *           type: number
 *         hasPrevPage:
 *           type: boolean
 *         hasNextPage:
 *           type: boolean
 *         prevLink:
 *           type: string
 *         nextLink:
 *           type: string
 *     ProductUpdateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         code:
 *           type: string
 *         stock:
 *           type: number
 *         category:
 *           type: string
 *     FakeProductData:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           price:
 *             type: string
 */


const prod = new ProductManager();

export const getProds = async (req, res) => {
  try {
    const { title, page, limit, sort } = req.query;
    const result = await prod.getPagination(title, limit, page, sort);
    const next = result.hasNextPage
      ? `http://localhost:8080/api/products?page=${result.nextPage}`
      : null;
    const prev = result.hasPrevPage
      ? `http://localhost:8080/api/products?page=${result.prevPage}`
      : null;
    res.status(200).json({
      status: "sucess",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: prev,
      nextLink: next,
    });
  } catch (error) {
    logger.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getById = async (req, res) => {
  try {
    const params = req.params;
    const prods = await prod.getProductById(params.pid);
    res.json(prods);
  } catch (error) {
    logger.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ error: "Error al obtener el producto por ID" });
  }
};

export const addProd = async (req, res) => {
  try {
    const response = await prod.addProduct(req.body);
    if (response) {
      res.status(200).json({ message: "producto agregado", prod: req.body });
    } else {
      res.json({ message: "error" });
    }
  } catch (error) {
    logger.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

export const updateProd = async (req, res) => {
  try {
    const id = req.params;
    const field = Object.keys(req.body).toString();
    const elem = Object.values(req.body).toString();
    const result = await prod.updateProduct(id.pid, field, elem);
    res.json(result);
  } catch (error) {
    logger.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProd = async (req, res) => {
  try {
    const id = req.params;
    const result = await prod.deleteProduct(id.pid);
    res.json(result);
  } catch (error) {
    logger.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const mocking = (req, res) => {
  try {
    const mocks = [];
    while (mocks.length !== 100) {
      const { price, product } = faker.commerce;
      const obj = { name: product(), price: price() };
      mocks.push(obj);
    }
    res.json(mocks);
  } catch (error) {
    logger.error("Error al generar datos falsos:", error);
    res.status(500).json({ error: "Error al generar datos falsos" });
  }
};
