import { cartModel } from "../models/carts.model.js";

class CartManager {

  async createCart() {
    try {
      const cart = await cartModel.create({
        products: [],
      });
      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      const deleted = await cartModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }

  async getCart(id) {
    try {
      const getCart = cartModel.findById(id).populate('products');
      return getCart;
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(cid, pid) {
    try {
      const getId = await cartModel.findById(cid);
      
      // me fijo si el carrito esta creado
      if (!!getId) {

        getId.products.push({productId: pid, quantity: 1})
        getId.save()
      
      } else {
        return { error: "carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async copyCart(cid) {
    try {
      const getCart = await cartModel.findById(cid)
      
    } catch (err) {
      console.log(err);
    }
  }

  async removeFromCart(cid, pid) {
    try {

      const getId = await cartModel.findById(cid);

      if (!!getId) {
        const isHere = getId.products.find((e) => e.productId === pid);
        if (!!isHere) {
          getId.products.filter((e) => e.productId !== pid);
          return await cartModel.findByIdAndUpdate(cid, { products: update })
        } else {
          return { error: "No se encuentra el producto en la base de datos" };
        }
      } else {
        return { error: "No se encuentra el carrito en la base de datos" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async emptyCart(cid) {
    try {
      return await cartModel.findByIdAndUpdate(cid, { products: [] })
    } catch (err) {
      console.log(err);
    }
  }
}

export default CartManager;
