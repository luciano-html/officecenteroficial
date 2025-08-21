"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearToken = crearToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function crearToken(usuarioNombre, usuarioId, usuarioRol) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = { nombre: usuarioNombre, id: usuarioId, rol: usuarioRol };
            const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
            return token;
        }
        catch (error) {
            console.log("Error al crear token");
        }
    });
}
