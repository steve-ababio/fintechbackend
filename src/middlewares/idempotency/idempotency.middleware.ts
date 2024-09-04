import {Request,Response,NextFunction} from "express";
import { inmemorystore } from "../../utils/store/store";

async function checkIdempotencyKeyExistence(idempotencykey:string){
    let response = await inmemorystore.getData(idempotencykey);
    return response;
}
export async function checkIdempotencyKey(req:Request,res:Response,next:NextFunction){
    const idempotencykey = req.headers["idempotency-key"] as string;
    console.log("idempotencykey: ",idempotencykey)
    if (!idempotencykey) {
        return res.status(400).json({ message: 'Idempotency key is required' });
    }
    const response = await checkIdempotencyKeyExistence(idempotencykey);
    if(response){
        return res.status(200).json({message:response});
    }
    const ttl = 60 * 10;
    await inmemorystore.storeData(idempotencykey,"Transaction successful");
    next();
}