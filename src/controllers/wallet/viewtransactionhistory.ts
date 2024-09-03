import {ParamsDictionary} from "express-serve-static-core";
import {Response,Request} from "express";
import { prisma } from "../../lib/prisma";

async function fetchTransactionHistory(username:string){
    try{
        const transactionhistory = await prisma.transaction.findMany({
            where:{
                username
            }
        });
        return transactionhistory;
    }catch(error){
        //handle error
    }
}
export async function viewTransactionHistory(req:Request<ParamsDictionary,any,{username:string}>, res:Response){
    const {username} = req.body;
    const transactionhistory = await fetchTransactionHistory(username);
    if(!transactionhistory){
        return res.status(200).json({transactionhistory:[]});
    }
    return res.status(200).json({transactionhistory});
}