import express from "express"
import dotenv from "dotenv"


const app = express()
dotenv.config()


const port = process.env.PORT

app.get("/", (_req, res) => {
    res.status(200).send("running")
})



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);

})