import { UsuariosNegocio } from "../models/usuariosNegocio.model";

export async function getAllUsers() {
    try {
        const usuarios = await UsuariosNegocio.find()
        console.log(usuarios);

    } catch (error) {
        console.log("Error obtener usuariios", error);

    }
}