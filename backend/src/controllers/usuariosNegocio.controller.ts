import { IUsuarioNegocio, UsuariosNegocio } from "../models/usuariosNegocio.model";
import bcrypt from "bcrypt"


import { Request, Response } from "express";
import { crearToken } from "../libs/jwtAuth";

export async function register(req: Request, res: Response) {
    try {
        const { nombre, apellido, email, pass, rol } = req.body

        const passHash = await bcrypt.hash(pass, 10)

        const usuarioNuevo: IUsuarioNegocio = new UsuariosNegocio({
            nombre,
            apellido,
            email,
            rol,
            pass: passHash
        })

        const usuarioGuardado = await usuarioNuevo.save()

        res.status(201).json({

            nombre: usuarioGuardado.nombre,
            apellido: usuarioGuardado.apellido,
            email: usuarioGuardado.email,
            rol: usuarioGuardado.rol

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al crear usuario", error })
    }
}


export async function login(req: Request, res: Response) {

    try {

        const { email, pass } = req.body

        if (!email || !pass) {
            return res.status(400).json({ message: "Faltan rellenar campos", success: false })
        }

        const usuario = await UsuariosNegocio.findOne({ email })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario o contraseña incorrecta", success: false })
        }

        const deHashPass = await bcrypt.compare(pass, usuario.pass)

        if (!deHashPass) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta", success: false })
        }


        const token = await crearToken(usuario.nombre, usuario.id, usuario.rol)

        res.cookie("token", token)

        res.status(200).json({
            message: `Usuario logeado`,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            rol: usuario.rol,

            success: true,

        })

    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesion", error })
    }

}

export async function logout(req: Request, res: Response) {

    try {

        res.clearCookie("token")
        res.status(200).json({ message: "Sesión cerrada", success: true })


    } catch (error) {

        res.status(500).json({ message: "Error al cerrar sesion", error, success: false })

    }


}

export async function profile(req: Request, res: Response) {

    try {
        const usuario = req.user
        res.status(200).json({ message: "Perfil", usuario, success: true })

    } catch (error) {

        res.status(400).json({ message: "Error al mostrar perfil", success: false })

    }

}

export async function getAllUsers(_req: Request, res: Response) {
    try {
        const usuarios = await UsuariosNegocio.find()
        res.status(200).json(usuarios)

    } catch (error) {
        console.log("Error obtener usuariios", error);

    }
}