import express from "express";
import cartRouter from "./routes/cart.router.js";
import prodRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./Dao/fileManager/ProductManager.js";
import MsgsManager from "./Dao/mongoManager/MsgsManager.js";
import "./Dao/dbConfig.js";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const path = new ProductManager("./src/Dao/db/product.json");
const msgManager = new MsgsManager();

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

//http://127.0.0.1:8080/
//http://127.0.0.1:8080/realtimeproducts para entrar.

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.use("/api/carts", cartRouter);
app.use("/api/products", prodRouter);

export const serverLocal = app.listen("8080", () => {
  console.log("200 OK");
});

const socketServer = new Server(serverLocal);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.on("showProds", async () => {
    const prods = await path.getProducts();
    socket.emit('prods', prods)
  });

  socket.on('showMsg', async () => {
    const getMsgs = await msgManager.getMsgs();
    socket.emit("msgs", getMsgs);
  })

  socket.on("send", async (e) => {
    const posted = await path.addProduct(e);
    const prods = await path.getProducts();
    socket.emit("alert", posted);
    socket.emit("prods", prods);
  });

  socket.on("delete", async (e) => {
    const deleted = await path.deleteProduct(e);
    const prods = await path.getProducts();
    socket.emit("alert", deleted);
    socket.emit("prods", prods);
  });

  socket.on("msg", async (e) => {
    const sendMsg = await msgManager.sendMsg(e);
    const getMsgs = await msgManager.getMsgs();
    socket.emit("alert", sendMsg);
    socket.emit("msgs", getMsgs);
  });
});
