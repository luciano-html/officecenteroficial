import mongoose, { Schema } from "mongoose";

const usuariosClienteSchema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: true
        }

    }
)