import mongoose from "mongoose"

export async function connectDb() {
    try {
        await mongoose.connect(process.env.URI_REMOTA || "")
        console.log("Conectado a la base de datos");

    } catch (error) {
        console.log("Error al conectarse a la base de datos", error);

    }
}
