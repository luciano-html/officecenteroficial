import mongoose, { Document } from "mongoose";

type Rol = "admin" | "empleado";

const UsuariosNegocioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, "ADM_NAM_REQ_01"],
        minlength: [6, "ADM_NAM_LEN_01"],
        maxlength: [26, "ADM_NAM_LEN_02"],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, "ADM_LAS_REQ_01"],
        minlength: [6, "ADM_LAS_LEN_01"],
        maxlength: [18, "ADM_LAS_LEN_02"],
    },

    email: {
        type: String,
        required: [true, "ADM_EML_REQ_01"],
        minlength: [5, "ADM_EML_LEN_01"],
        maxlength: [50, "ADM_EML_LEN_02"],
        match: [/^\S+@\S+\.\S+$/, "ADM_EML_INV_01"],
        unique: true
    },

    pass: {
        type: String,
        required: [true, "ADM_PAS_REQ_01"],
        minlength: [8, "ADM_PAS_LEN_01"]
    },



    rol: {
        type: String,
        enum: {
            values: ["admin", "empleado"],
            message: "ADM_ROL_ENUM_01"
        },
        required: [true, "ADM_ROL_REQ_01"]
    }

}, { versionKey: false, timestamps: true })

export interface IUsuarioNegocio extends Document {
    nombre: string,
    apellido: string,
    pass: string,
    email: string,
    rol: Rol
}

export const UsuariosNegocio = mongoose.model<IUsuarioNegocio>(
    "UsuariosNegocio", // Nombre del modelo que usaremos
    UsuariosNegocioSchema, // Esquema
    "usuarios"// Nombre de la coleccion donde operaremos
)