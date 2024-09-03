import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response,NextFunction} from "express";
import { prisma } from "../../lib/prisma";

async function queryIdempotencyKey(idempotencykey:string){
    try{
        const result = await prisma.transaction.findUnique({
            where:{
                idempotencykey
            }
        });
        return result;
    }catch(error){
        //handle error
    }
}
export async function checkIdempotencyKey(req:Request,res:Response,next:NextFunction){
    const idempotencykey = req.headers["IdempotencyKey"] as string;
    const idempotencykeyexists = await queryIdempotencyKey(idempotencykey);
    if(idempotencykeyexists){
        return res.status(200).json({message:"Transaction successful"});
    }
    next();
}