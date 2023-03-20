import express from "express";
import apiCartRouter from "./routes/cart.router.js";
import prodRouter from "./routes/products.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionRouter from "./routes/session.router.js"
import views from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import ProductManager from "./Dao/mongoManager/ProductManager.js";
import MsgsManager from "./Dao/mongoManager/MsgsManager.js";
import CartManager from "./Dao/mongoManager/CartManager.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store"
import mongoStore from "connect-mongo"
import "./Dao/dbConfig.js";

export const app = express();
const cookieKey = "SignedCookieKey";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(cookieKey));

const fileStore = FileStore(session)
app.use(
  session({
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 50000 },
    store: new mongoStore({
      mongoUrl: "mongodb+srv://julianrivarola1:lol1234@cluster0.6fwfoj1.mongodb.net/ecommerce?retryWrites=true&w=majority"
    })
  })
);

const path = new ProductManager();
const msgManager = new MsgsManager();
const cartManager = new CartManager();

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

// views de hbs
app.use("/", views);

app.use('/', sessionRouter)
app.use("/cookies", cookieRouter);

// app.use("/cart", cartRouter)
app.use("/api/carts", apiCartRouter);
app.use("/api/products", prodRouter);

export const serverLocal = app.listen("8080", () => {
  console.log("200 OK");
});

const socketServer = new Server(serverLocal);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.on("showProds", async () => {
    const prods = await path.getProducts();
    socket.emit("prods", prods);
  });

  socket.on("showMsg", async () => {
    const getMsgs = await msgManager.getMsgs();
    socket.emit("msgs", getMsgs);
  });

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

  socket.on("mongoProds", async () => {
    const getPags = await path.getPagination();
    socket.emit("prods", getPags);
  });

  socket.on("addToCart", async (e) => {
    const cart = await cartManager.addToCart(e.idCart, e.obj._id);
    socket.emit("alert", cart);
  });
});
