import jwt, { JwtPayload } from "jsonwebtoken"

export interface JwtUserPayload extends JwtPayload {
    id: string,
    rol: "admin" | "empleado"
}

export async function crearToken(usuarioNombre: string, usuarioId: string, usuarioRol: string) {

    try {
        const payload = { nombre: usuarioNombre, id: usuarioId, rol: usuarioRol }

        
        const token = jwt.sign(payload, process.env.SECRET_KEY!)


        return token

    } catch (error) {
        console.log("Error al crear token");

    }

}

