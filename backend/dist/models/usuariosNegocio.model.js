"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosNegocio = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UsuariosNegocioSchema = new mongoose_1.default.Schema({
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
}, { versionKey: false, timestamps: true });
exports.UsuariosNegocio = mongoose_1.default.model("UsuariosNegocio", // Nombre del modelo que usaremos
UsuariosNegocioSchema, // Esquema
"usuarios" // Nombre de la coleccion donde operaremos
);
