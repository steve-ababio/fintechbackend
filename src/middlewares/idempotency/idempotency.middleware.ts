import {Request,Response,NextFunction} from "express";
import { idempotencykeystore } from "../../utils/store/store";

async function checkIdempotencyKeyExistence(idempotencykey:string){
    let response = await idempotencykeystore.getIdempotencyKey(idempotencykey);
    return response;
}
export async function checkIdempotencyKey(req:Request,res:Response,next:NextFunction){
    const idempotencykey = req.headers["idempotency-key"] as string;
    if (!idempotencykey) {
        return res.status(400).json({ message:'Idempotency key is required' });
    }
    const response = await checkIdempotencyKeyExistence(idempotencykey);
    if(response){
        return res.status(200).json({message:response});
    }
    next();
}