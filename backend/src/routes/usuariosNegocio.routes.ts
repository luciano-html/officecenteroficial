import { Router } from "express";
import { getAllUsers, login, logout, profile, register } from "../controllers/usuariosNegocio.controller";
import { verificarToken } from "../middlewares/verificarToken";

export const usuariosNegocioRoutes = Router()

usuariosNegocioRoutes.get("/", getAllUsers)

usuariosNegocioRoutes.post("/register", register)
usuariosNegocioRoutes.post("/login", login)
usuariosNegocioRoutes.post("/logout", logout)

usuariosNegocioRoutes.get("/profile", verificarToken, profile)


