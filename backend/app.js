import e from "express";
//Importar las rutas
import logInAdminRoute from "./src/routes/logInAdminsRoute.js";
import logInClientsRoute from "./src/routes/logInClientsRoute.js";
import logOutRoute from "./src/routes/logOutRoutes.js";
import registerAdminRoute from "./src/routes/registerAdminsRoute.js";
import registerClientRoute from "./src/routes/registerClientsRoute.js";

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
app.use("/api/logInAdmin", logInAdminRoute);
app.use("/api/logInClient", logInClientsRoute);
app.use("/api/logOut", logOutRoute);
app.use("/api/registerAdmin", registerAdminRoute);
app.use("/api/registerClient", registerClientRoute);

export default app;