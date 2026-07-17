import express from "express";
import logInAdminsController from "../controller/logInAdminsController.js";

const logInAdminRoute = express.Router();

logInAdminRoute.route("/").post(logInAdminsController.logIn);

export default logInAdminRoute;