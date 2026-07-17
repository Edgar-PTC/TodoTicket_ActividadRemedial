import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import adminsModel from "../models/adminsModel.js";

import { config } from "../config.js";

const logInAdminsController = {}

logInAdminsController.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userfound = await adminsModel.findOne({ email });

        if(!userfound){
            return res.status(400).json({ message: "Client not found" });
        }

        if(userfound.timeOut && userfound.timeOut > Date.now()){
            return res.status(400).json({ message: "Cuenta bloqueada" });
        }

        const isMatch = await bcrypt.compare(password, userfound.password);

        if(!isMatch){
            userfound.loginAttempts = ( userfound.loginAttempts || 0 ) + 1;

            if(userfound.loginAttempts >= 5){
                userfound.timeOut = Date.now() + 15 * 60 * 1000;
                userfound.loginAttempts = 0;
                await userfound.save();
                return res.status(400).json({ message: "Demasiados intentos fallidos" });
            }

            await userfound.save();
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        userfound.loginAttempts = 0;
        userfound.timeOut = null;
        await userfound.save();

        const token = jsonwebtoken.sign(
            { id: userfound._id, userType: "Admin" },
            config.jwt.secret,
            { expiresIn: "30d" }
        )

        res.cookie("authCookie", token);

        return res.status(200).json({ message: "Login Exitoso" });
    } catch (error) {
        console.log("Error en loginAdmin: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export default logInAdminsController;