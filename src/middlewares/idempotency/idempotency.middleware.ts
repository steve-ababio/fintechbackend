import {Request,Response,NextFunction} from "express";
import { redisstore } from "../../data/redis.store";

async function checkIdempotencyKeyExistence(idempotencykey:string){
    redisstore.getData(idempotencykey);
}
export async function checkIdempotencyKey(req:Request,res:Response,next:NextFunction){
    const idempotencykey = req.headers["IdempotencyKey"] as string;
    const idempotencykeyexists = await checkIdempotencyKeyExistence(idempotencykey);
    if(idempotencykeyexists){
        return res.status(200).json({message:"Transaction successful"});
    }
    next();
}