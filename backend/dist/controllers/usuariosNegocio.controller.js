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
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.profile = profile;
exports.getAllUsers = getAllUsers;
const usuariosNegocio_model_1 = require("../models/usuariosNegocio.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtAuth_1 = require("../libs/jwtAuth");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, apellido, email, pass, rol } = req.body;
            const passHash = yield bcrypt_1.default.hash(pass, 10);
            const usuarioNuevo = new usuariosNegocio_model_1.UsuariosNegocio({
                nombre,
                apellido,
                email,
                rol,
                pass: passHash
            });
            const usuarioGuardado = yield usuarioNuevo.save();
            res.status(201).json({
                nombre: usuarioGuardado.nombre,
                apellido: usuarioGuardado.apellido,
                email: usuarioGuardado.email,
                rol: usuarioGuardado.rol
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error al crear usuario", error });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, pass } = req.body;
            if (!email || !pass) {
                return res.status(400).json({ message: "Faltan rellenar campos", success: false });
            }
            const usuario = yield usuariosNegocio_model_1.UsuariosNegocio.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ message: "Usuario o contraseña incorrecta", success: false });
            }
            const deHashPass = yield bcrypt_1.default.compare(pass, usuario.pass);
            if (!deHashPass) {
                return res.status(400).json({ message: "Usuario o contraseña incorrecta", success: false });
            }
            const token = yield (0, jwtAuth_1.crearToken)(usuario.nombre, usuario.id, usuario.rol);
            res.cookie("token", token);
            res.status(200).json({
                message: `Usuario logeado`,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol,
                success: true,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al iniciar sesion", error });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "Sesión cerrada", success: true });
        }
        catch (error) {
            res.status(500).json({ message: "Error al cerrar sesion", error, success: false });
        }
    });
}
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = req.user;
            res.status(200).json({ message: "Perfil", usuario, success: true });
        }
        catch (error) {
            res.status(400).json({ message: "Error al mostrar perfil", success: false });
        }
    });
}
function getAllUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuarios = yield usuariosNegocio_model_1.UsuariosNegocio.find();
            res.status(200).json(usuarios);
        }
        catch (error) {
            console.log("Error obtener usuariios", error);
        }
    });
}
