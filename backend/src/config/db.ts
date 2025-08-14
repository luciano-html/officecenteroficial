import mongoose from "mongoose"
const uri = "mongodb+srv://lucianocgutierrez:infamano22@officecluster1.i8uia.mongodb.net/productosdb"

export async function connectDb() {
    try {
        await mongoose.connect(uri)
        console.log("Conectado a la base de datos");

    } catch (error) {
        console.log("Error al conectarse a la base de datos", error);

    }
}
