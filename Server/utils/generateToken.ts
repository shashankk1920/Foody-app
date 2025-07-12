import jwt from 'jsonwebtoken';

import { Response } from 'express';


export const generateToken =(res:Response, user:any) => {

    // if furthur it will show the error than we have to see that whether it is working or not than we will change it to IUserDocument

    const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY!, {expiresIn:'1d'});
    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

    res.cookie("token", token, {httpOnly:true, sameSite:'strict', maxAge: 86400000});
    return token;
}       

