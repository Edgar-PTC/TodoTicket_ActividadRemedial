import express from "express";
import wompiController from "../controller/wompiController.js";

const wompiRoute = express.Router();

wompiRoute.route("/token").post(wompiController.generarToken);
wompiRoute.route("/test").post(wompiController.paymentTest);

export default wompiRoute;