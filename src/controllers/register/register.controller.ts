import {ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import { User } from "../../types/types";
import { sendVerificationEmail } from "../../utils/email/email";
import { checkEmailExitence, checkFieldsAvailability, checkUsernameExistence, createUser, createUserWallet, hashPassword } from "../../services/auth/register/register.services";

export async function registerUser(req:Request<ParamsDictionary,any,User>, res:Response){
    const {username,email,password} = req.body;

    //check for required fields
    if(checkFieldsAvailability({username,email,password})){
        return res.status(400).json({message:"All fields are required" });
    }
    //check for username and email existence
    const[usernameexists,emailexists] = await Promise.all([checkUsernameExistence(username),checkEmailExitence(email)]);
    if(usernameexists){
     return res.status(400).json({message:"Username already exists" });
    }
    if(emailexists){
     return res.status(400).json({message:"Email already exists" });
    }
    const hashedpassword = await hashPassword(password);
    const user = await createUser({username,email,password:hashedpassword});

    if(user){
        await Promise.all([createUserWallet(user.id),sendVerificationEmail(email,user.id)]);
    }
    res.status(201).json({message:"User registered successfully"});
}