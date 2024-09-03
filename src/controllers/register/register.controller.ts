import {ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../types/types";
import { prisma } from "../../lib/prisma";
import { sendVerificationEmail } from "../../utils/email/email";

async function checkUsernameExistence(username:string){
    try{
        const result = await prisma.user.findUnique({where:{username}});
        return result !== null;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function createUser({username,email,password}:User){
    try{
        const result = await prisma.user.create({
            username,
            email,
            password
        });
        return result;
    }catch(error){
        //handle error
    }
}
async function checkEmailExitence(email:string){
    try{
        const result = await prisma.user.findUnique({where:{email}});
        return result !== null;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function hashPassword(plainpassword:string){
    const hashedpassword = await bcrypt.hash(plainpassword,10);
    return hashedpassword;
}
async function createUserWallet(userid:string){
    try{
        await prisma.wallet.create({
            data:{
                balance:0.0,
                currency:"USD",
                userid
            }
        });
    }catch(error){
        //handle error
    }
}
function checkFieldsAvailability({username,email,password}:User){
    return username !== "" && email !== "" && password !== "";
}

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