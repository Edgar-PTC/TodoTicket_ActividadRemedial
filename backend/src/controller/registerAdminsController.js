import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";

import adminsModel from "../models/adminsModel.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerAdminsController = {};

registerAdminsController.insert = async (req, res) => {
    try {
        let { name, lastName, email, password } = req.body;

        name = name?.trim();
        lastName = lastName?.trim();
        email = email?.trim();
        password = password?.trim();

        if( !name || !lastName || !email || !password ){
            return res.status(400).json({ message: "Campos necesarios sin enviar" });
        }

        const exist = await adminsModel.findOne({ email });
        if(exist){
            return res.status(400).json({ message: "Email already in use" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = adminsModel({ name, lastName, email, password: passwordHash, isVerified: false });
        await newUser.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode },
            config.jwt.secret,
            { expiresIn: "15m" }
        );

        res.cookie("verificationTokenCookie", tokenCode, { maxAge: 15*60*1000 });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: `${verificationCode}. Codigo de verificacion`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
                return res.status(500).json({ message: "Error al enviar correo" });
            }

            return res.status(200).json({ message: "Email sent" });
        })
    } catch (error) {
        console.log("Error en registerAdmin: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

registerAdminsController.verifyCode = async(req, res) => {
    try {
        const { verificationCodeRequest } = req.body;

        const token = req.cookies.verificationTokenCookie;

        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode } = decoded;

        if( verificationCodeRequest !== verificationCode ){
            return res.status(400).json({ message: "Codes not match" });
        }
        
        const userFound = await adminsModel.findOne({ email });
        userFound.isVerified = true;
        await userFound.save();

        res.clearCookie("verificationTokenCookie");

        return res.status(200).json({ message: "Admin verified" });
    } catch (error) {
        console.log("Error en registerAdmin: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export default registerAdminsController;