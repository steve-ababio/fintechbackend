import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { verifyToken } from "../../utils/token/token";
import { prisma } from "../../lib/prisma";
import { eventemitter } from "../../events/emitter/emitter.event";

async function confirmEmail(userid:string){
    const result = await prisma.user.update({
        data:{
            confirmed:true
        },
        where:{
            id:userid
        },
        select:{
            id:true
        }
    });
    return result;
}
export async function verifyEmail(req:Request<ParamsDictionary,any>,res:Response){
    const token = req.params.token;
    const emailsecret = process.env.EMAIL_SECRET!;
    try{
        const {userid} = verifyToken(token,emailsecret);
        const emailconfirmed = await confirmEmail(userid);
        if(emailconfirmed){
            eventemitter.emit("createwallet",userid);
        }
        res.status(200).json({message:"Email verification successful."});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Email verification failed, Internal Server Error"});
    }
}