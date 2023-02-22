import mongoose from 'mongoose'

// Usuario y clave del usuario adminw

const URI = 'mongodb+srv://julianrivarola1:lol1234@cluster0.6fwfoj1.mongodb.net/ecommerce?retryWrites=true&w=majority'

// Conexion con el servidor de mongoose

mongoose.set("strictQuery", true);
mongoose.connect(URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a MongoDB");
  }
});