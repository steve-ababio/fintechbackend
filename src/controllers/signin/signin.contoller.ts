import {ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import { ComparePasswords, findUser } from "../../services/auth/signin/signin.services";
import { generateJWTToken } from "../../utils/token/token";

type User = {
    username:string,
    password:string
}
export async function signIn(req:Request<ParamsDictionary,any,User>, res:Response){
    const {username,password} = req.body;
    try{
        const user = await findUser(username); 
        if(!user){
            return res.status(401).json(({message:"Please provide correct credentials"}))
        }
        if(!user.confirmed){
            return res.status(401).json({message:"Please verify your email"});
        }
        const match = await ComparePasswords(password,user.password);
        console.log("match:",match);
        if(!match){
            return res.status(401).json(({message:"Please provide correct credentials"}))
        }
        const authtoken = generateJWTToken({userid:user.id},process.env.AUTH_SECRET!,"2h");
        return res.status(200).json(({message:"Authentication successful",token:authtoken}));
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}