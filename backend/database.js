import mongoose from "mongoose";
import { config } from "./src/config.js"

mongoose.connect(config.db.url);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Conexion a la base exitosa");
})

connection.on("disconnected", () => {
    console.log("Conexion a la base perdida. Ohno hermano");
})

connection.on("error", (error) => {
    console.log("Error en la conexion a la base de datos: ", error);
})