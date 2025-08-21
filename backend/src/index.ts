import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js"
import { usuariosNegocioRoutes } from "./routes/usuariosNegocio.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
connectDb()





app.use("/", usuariosNegocioRoutes)

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);

})