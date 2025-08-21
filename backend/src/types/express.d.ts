import { TokenPayload } from "../../middlewares/verificarToken";

declare global {
  namespace Express {
    export interface Request {
      user?: TokenPayload;
    }
  }
}