import jsonwentoken from "jsonwebtoken";
import { config } from "../config.js";

export const validateAuthCookie = (allowedTypes = []) => {
    try {
        return(req, res, next) => {
            const { authCookie } = req.cookies;

            if(!authCookie){
                return res.status(400).json({ message: "Sin inicio de sesion activo" });
            }

            const decoded = jsonwentoken.verify(authCookie, config.jwt.secret);

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(400).json({ message: "No tienes los permisos necesarios" });
            }

            next();
        }
    } catch (error) {
        console.log("Error en ValidateAuth: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}