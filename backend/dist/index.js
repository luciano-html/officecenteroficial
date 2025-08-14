"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
(0, db_js_1.connectDb)();
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
