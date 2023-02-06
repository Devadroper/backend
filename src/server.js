import express from "express";
import cartRouter from "./routes/cart.router.js";
import prodRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import ProductManager from "./container/ProductManager.js";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

const path = new ProductManager("./src/db/product.json");

// * Evita el error: ANOENT: main.hbs
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
);
// *
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.use("/api/carts", cartRouter);
app.use("/api/products", prodRouter);

export const serverLocal = app.listen("8080", () => {
  console.log("200 OK");
});

const socketServer = new Server(serverLocal);

const prods = await path.getProducts()

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);
  socket.emit("prods", prods);

  socket.on('send', async e => {
    await path.addProduct(e)
    socket.emit("prods", prods);
  })

  socket.on('delete', async e => {
    await path.deleteProduct(e)
    socket.emit('prods', prods)
  })
});