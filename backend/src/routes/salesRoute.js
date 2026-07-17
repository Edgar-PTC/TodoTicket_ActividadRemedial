import express from "express";
import salesController from "../controller/salesController.js";
import { validateAuthCookie } from "../middleware/authMiddleware.js";

const salesRoute = express.Router();

salesRoute.route("/")
.get(validateAuthCookie(["Admin"]), salesController.get)
.post(validateAuthCookie(["Client"]), salesController.post);

salesRoute.route("/:id")
.put(validateAuthCookie(["Admin", "Client"]), salesController.put)
.delete(validateAuthCookie(["Admin"]), salesController.delete);

export default salesRoute;