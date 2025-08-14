"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosNegocio = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UsuariosNegocioSchema = new mongoose_1.default.Schema({
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
}, { versionKey: false, timestamps: true });
exports.UsuariosNegocio = mongoose_1.default.model("UsuariosNegocio", // Nombre del modelo que usaremos
UsuariosNegocioSchema, // Esquema
"usuarios" // Nombre de la coleccion donde operaremos
);
