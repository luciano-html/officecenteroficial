import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import { getAllUsers } from "./controllers/usuariosNegocio.controller.js"
import { usuariosNegocioRoutes } from "./routes/usuariosNegocio.routes.js"


const app = express()
const port = process.env.PORT

dotenv.config()
connectDb()




app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);

})