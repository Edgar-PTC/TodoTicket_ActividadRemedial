import express from "express";
import logInClientsController from "../controller/logInClientsController.js";

const logInClientsRoute = express.Router();

logInClientsRoute.route("/").post(logInClientsController.logIn);

export default logInClientsRoute;