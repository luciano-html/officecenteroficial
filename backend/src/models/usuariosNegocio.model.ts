import mongoose from "mongoose";

type Rol = "admin" | "empleado";

const UsuariosNegocioSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true
    },

    pass: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        enum: ["admin", "empleado"],
        required: true
    }

}, { versionKey: false, timestamps: true })

interface UsuarioNegocio {
    usuario: String,
    pass: String,
    email: String,
    rol: Rol
}

export const UsuariosNegocio = mongoose.model<UsuarioNegocio>(
    "UsuariosNegocio", // Nombre del modelo que usaremos
    UsuariosNegocioSchema, // Esquema
    "usuarios"// Nombre de la coleccion donde operaremos
)