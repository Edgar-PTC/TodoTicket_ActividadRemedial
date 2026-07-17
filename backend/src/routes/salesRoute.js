import express from "express";
import salesController from "../controller/salesController.js";

const salesRoute = express.Router();

salesRoute.route("/")
.get(salesController.get)
.post(salesController.post);

salesRoute.route("/:id")
.put(salesController.put)
.delete(salesController.delete);

export default salesRoute;