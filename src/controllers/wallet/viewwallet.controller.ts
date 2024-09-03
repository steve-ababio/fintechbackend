import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { prisma } from "../../lib/prisma";

async function fetchWallet(userid:string){
    try{
        const result = await prisma.wallet.findUnique({
            where:{
                userid
            },
            select:{
                balance:true,
                currency:true
            }
        });
        return result;
    }catch(error){
        //handle error
    }
}
export async function viewWallet(req:Request<ParamsDictionary>, res:Response){
    const userid = req.params.userid;
    const wallet = await fetchWallet(userid);
    return res.status(200).json({wallet});
}