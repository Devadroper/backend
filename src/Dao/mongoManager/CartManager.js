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
      const getCart = cartModel.findById(id);
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

        const getProd = getId.products.find(e => e.productId === pid)

        // despues me fijo que el producto ya exista en el carrito
        if (!!getProd) {
          const update = getId.products.map(prod => {
            if (prod.productId == pid) {
              prod.quantity += 1
            }
            return prod
          })
          return await cartModel.findByIdAndUpdate(cid, { products: update })
        } else {
          const addProd = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { productId: pid, quantity: 1 } } }
          );
          return addProd
        }
      } else {
        return { error: "carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async removeFromCart(cid, pid) {
  //   try {
  //     const read = await fs.readFile(this.path, "utf-8");
  //     const cart = JSON.parse(read);
  //     let search = cart.find((e) => e.id === Number(cid)); // buscar el carrito
  //     if (!!search) {
  //       const isHere = search.products.find((e) => e.product === Number(pid)); // buscar producto
  //       if (!!isHere) {
  //         search.products.filter((e) => e.product !== pid);
  //         await fs.writeFile(this.path, JSON.stringify(cart, null, 2), "utf-8");
  //         return { message: "Se ha eliminado el producto seleccionado" };
  //       } else {
  //         return { error: "No se encuentra el producto en la base de datos" };
  //       }
  //     } else {
  //       return { error: "No se encuentra el carrito en la base de datos" };
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

export default CartManager;
