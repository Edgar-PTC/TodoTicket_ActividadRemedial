import express from "express";
import registerClientsController from "../controller/registerClientsController.js";

const registerClientRoute = express.Router();

registerClientRoute.route("/").post(registerClientsController.insert);
registerClientRoute.route("/verifyCode").post(registerClientsController.verifyCode);

export default registerClientRoute;