import {Request,Response,NextFunction} from "express";
import { verifyToken } from "../../utils/token/token";

declare global{
    namespace Express {
       export interface Request {
          userid?: string
       }
    }
 }
export async function verifyUser(req:Request,res:Response,next:NextFunction){
    const authtoken = req.headers["authorization"]?.split(" ")[1]; 
    if (!authtoken) 
        return res.status(401).json({error:"Token does not exist",message: 'not authorized'});
    try{
        const payload = verifyToken(authtoken,process.env.AUTH_SECRET!);
        req.userid = payload.userid;
    }catch(error){
        return res.status(401).json({error,message:'Not authorized'});
    }
    next();
}