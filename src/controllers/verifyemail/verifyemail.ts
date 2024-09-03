import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { verifyToken } from "../../utils/token/token";
import { prisma } from "../../lib/prisma";

async function confirmEmail(userid:string){
    try{
        await prisma.user.update({
            data:{
                confirmed:true
            },
            where:{
                id:userid
            }
        });
    }catch(error){
        //handle error
    }
}
export async function verifyEmail(req:Request<ParamsDictionary,any>,res:Response){
    const token = req.params.token;
    const emailsecret = process.env.EMAIL_SECRET!;
    try{
        const {userid} = verifyToken(token,emailsecret);
        await confirmEmail(userid);
    }catch(error){
        //handle error
    }
}