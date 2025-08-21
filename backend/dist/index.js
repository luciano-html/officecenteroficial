"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_js_1 = require("./config/db.js");
const usuariosNegocio_routes_js_1 = require("./routes/usuariosNegocio.routes.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_js_1.connectDb)();
app.use("/", usuariosNegocio_routes_js_1.usuariosNegocioRoutes);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
