import e from "express";
//Importar las rutas

import cookieParser from "cookie-parser";
import cors from "cors"
import limiter from "./src/middleware/rateLimit.js";
import { config } from "./src/config.js";

const app = e();

app.use(limiter);

app.use(cors({
    origin: config.app.frontend_url,
    credentials: true
}));

app.use(cookieParser());

app.use(e.json());

//Importar los endpoints


export default app;