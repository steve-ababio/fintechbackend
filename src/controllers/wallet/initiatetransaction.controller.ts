import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { prisma } from "../../lib/prisma";
import { Transaction, TransactionDetails } from "../../types/types";

async function updateReceipientBalance(receiver:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{
                username:receiver
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        });
        return result;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function updateSenderBalance(sender:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{
                username:sender
            },
            data:{
                balance:{
                    decrement:amount
                }
            }
        });
        return result;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function sendMoney(amount:number,sender:string,receiver:string){
    try{
        const[senderwalletupdate,receipientwalletupdate] = await Promise.all([updateSenderBalance(sender,amount),updateReceipientBalance(receiver,amount)]);
        return senderwalletupdate && receipientwalletupdate;
    }catch(error){
        //handle error
    }
}
async function fetchSenderWalletBalance(sender:string){
    try{
        const balance = await prisma.user.findUnique({
            where:{
                username:sender
            },
            select:{
                balance:true
            }
        });
        return balance;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function validateWalletBalance(sender:string,amount:number){
    try{
        const balance = await fetchSenderWalletBalance(sender);
        return balance >= amount;
    }catch(error){
        //handle error
        console.log(error);
    }
}
async function checkIdempotencyKey(idempotencykey:string){
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
async function storeTransaction(transaction:Transaction){
    await prisma.transaction.create(transaction);
}

export async function initiateTransaction(req:Request<ParamsDictionary,any,TransactionDetails>,res:Response){
    const {sender,receipient,amount} = req.body;
    const idempotencykey = req.headers["IdempotencyKey"] as string;
    const idempotencykeyexists = await checkIdempotencyKey(idempotencykey);
    
    if(idempotencykeyexists){
        return res.status(200).json({message:"Transaction successful"});
    }
    const sendingamount = parseFloat(amount);
    const isfundssufficient = await validateWalletBalance(sender,sendingamount);
    if(!isfundssufficient){
        return res.status(400).json({message:"Insufficient funds" });
    }
    const istransactionsuccessful = await sendMoney(sendingamount,receipient,sender);
    if(!istransactionsuccessful){
        return res.status(500).json({message:"Failed to initiate transaction" });
    }
    const transaction:Transaction = {
        amount:sendingamount,
        receipient,
        timestamp:new Date(),
        idempotencykey,
    }
    await storeTransaction(transaction);
    return res.status(200).json({message:"Transaction successful" });
}