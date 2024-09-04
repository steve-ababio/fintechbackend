import {ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import { User } from "../../typings/types";
import { sendVerificationEmail } from "../../utils/email/email";
import { checkEmailExistence, checkFieldsAvailability, checkUsernameExistence, createUser, hashPassword } from "../../services/auth/register/register.services";

export async function registerUser(req:Request<ParamsDictionary,any,User>, res:Response){
    const {username,email,password} = req.body;

    const allfieldsavailable = checkFieldsAvailability({username,email,password});
    if(!allfieldsavailable){
        return res.status(400).json({message:"All fields are required" });
    }
    try{
        const[usernameexists,emailexists] = await Promise.all([checkUsernameExistence(username),checkEmailExistence(email)]);
        if(usernameexists){
        return res.status(400).json({message:"Username already exists" });
        }
        if(emailexists){
        return res.status(400).json({message:"Email already exists" });
        }
        const hashedpassword = await hashPassword(password);
        const user = await createUser({username,email,password:hashedpassword});
        if(user){
            sendVerificationEmail(email,user.id)
        }
        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}