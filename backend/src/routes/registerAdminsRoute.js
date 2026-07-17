import express from "express";
import registerAdminsController from "../controller/registerAdminsController.js";

const registerAdminRoute = express.Router();

registerAdminRoute.route("/").post(registerAdminsController.insert);
registerAdminRoute.route("/verifyCode").post(registerAdminsController.verifyCode);

export default registerAdminRoute;