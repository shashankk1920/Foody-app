import {Request, Response} from 'express';
import { User } from '../models/user.model';

import bcrypt from 'bcryptjs';

import crypto from 'crypto';
import { send } from 'process';
import cloudinary from '../utils/cloudinary';

export const signup = async(req:Request, res:Response) =>{
    try{
        const{fullname, email, password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message: 'User already exists'});
        }
       const hashedPassword = await bcrypt.hash(password, 10);
       const verificationToken = "dsfghfsfdhbgsf" //generateVerificationToken();

      user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        //if error will found than please check this one 
        contact:Number(req.body.contact),
        verificationToken,
        verificationTokenExpiresAt:Date.now() + 24*60*60*1000
    });
    //generateToken(req,user);
  

    //await sendEmailVerificationEmail(email, verififcationToken);

    const userWithPassword = await User.findOne({email}).select('-password');

    return res.status(201).json({
        success:true,
        message:"Account created successfully",
        user,
    });
 } catch(error){
        console.log(error);
         return res.status(500).json({message: 'Internal server error'});
    }
}

export const login = async(req:Request,res:Response) =>{
    try{
        const{email,password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });

        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){    
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        // generate token(res, user)
        user.lastLogin = new Date();
        await user.save();

        // send user without password
        const userWithoutPassword = await User.findOne({    email}).select('-password');
        return res.status(200).json({   success:true, 
            message:`Welcome back ${user.fullname}`,
            user:userWithoutPassword
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const verifyEmail= async(req:Request,res:Response) =>{
    try{
     const {verificationToken} = req.params;
     const {verificationCode} = req.body;
     const user = await User.findOne({verificationToken: verificationCode,verificationTokenExpiresAt:{$gt:Date.now()}}).select('-password');
     if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid or expired verification token"
        });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //send welcome email
    //await sendWelcomeEmail(user.email, user.fullname);

    return res.status(200).json({
        success:true,
        message:"Email verification successful",
        user
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = async(req:Request,res:Response) =>{
  try{
    return res.clearCookie('token').json({
        success:true,
        message:"Logged out successfully"
    });
  }catch(error){
      console.log(error);
      return res.status(500).json({message: 'Internal server error'});
  } 
};


export const forgotPassword= async(req:Request,res:Response) =>{    
    try{
        const {email} = req.body;
        const user = await User.findOne ({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        };
        const resetToken = crypto.randomBytes(40).toString('hex'); 
        const resetTokenExpiresAt = new Date(Date.now() + 1*60*60*1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();

        // send email

      //  await sendPasswordResetEmail(user.email, `${process.env.FrontendURL}/reset-password/${resetToken}`);

      return res.status(200).json({
          success:true,             
          message:"Password reset link sent to email"
      });       

    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const resetPassword = async (req:Request,res:Response) =>{
    try{
        const {token} = req.params;
        const {newPassword} = req.body;
        const user = await User.findOne({resetPasswordToken:token,resetPasswordTokenExpiresAt:{$gt:Date.now()}});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired reset token"
            });

            }
            // update password 
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpiresAt = undefined;
            await user.save();
    
            //send  success reset email
            //await sendResetSuccessEmail(user.email)
            
            return res.status(200).json({
                success:true,
                message:"Password reset successful"
            });
        } catch(error){
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    export const checkAuth = async (req:Request,res:Response) =>{   
        try{
          const userId = req.id;
          const user = await User.findById(userId).select('-password');
          if(!user){
              return res.status(400).json({
                  success:false,
                  message:"User not found"
              });
          };
          return res.status(200).json({
            success:true,
            user
          })

        }catch(error){
           console.log(error);      
              return res.status(500).json({message: 'Internal server error'});
        }
    };

    export const updateProfile = async(req:Request,res:Response) =>{
        try {
            const userId = req.id;
            const {fullname, email, address, country, profilePicture, city} = req.body;

            //upload image on cloudinary

        let cloudResponse :any;
       
            cloudResponse = await cloudinary.uploader.upload(profilePicture);

            const updateData = {fullname, email,address,city,country,profilePicture};

            const user = await User.findByIdAndUpdate(userId, updateData).select("-password");

            return res.status(200).json({
                success:true,
                message:"Profile updated successfully",
                user
            });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        } 
    }


