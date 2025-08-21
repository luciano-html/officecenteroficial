import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret: string = process.env.SECRET_KEY!

export interface TokenPayload extends JwtPayload {
    nombre: string,
    id: string;
    email: string;
    rol: string;
}

export async function verificarToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { token } = req.cookies

    if (!token) {

        return res.status(401).json({
            message: "Sin token, desautorizado",
            success: false
        })

    }

    try {

        const decoded = jwt.verify(token, secret) as TokenPayload
        req.user = decoded

        next()

    } catch (error) {
        console.log(secret);

        return res.status(403).json({
            message: "Token inválido",
            success: false
        });

    }

}


