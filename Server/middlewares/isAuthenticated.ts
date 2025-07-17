import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express{
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        // verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        
        // check is decoding was successful
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
