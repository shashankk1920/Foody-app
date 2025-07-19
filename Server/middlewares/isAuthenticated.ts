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
        console.log("🔐 Authentication check - Cookies received:", req.cookies);
        const token = req.cookies.token;
        
        if (!token) {
            console.log("❌ No authentication token found in cookies");
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        console.log("🔑 Token found, verifying...");
        // verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        
        // check is decoding was successful
        if (!decode) {
            console.log("❌ Token verification failed");
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        
        console.log("✅ Token verified successfully for user:", decode.userId);
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error('❌ Error in isAuthenticated middleware:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
