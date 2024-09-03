import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { Transaction, TransferDetails } from "../../types/types";
import { processTransaction, storeTransaction, validateWalletBalance } from "../../services/wallet/transaction/transaction.services";

export async function initiateTransaction(req:Request<ParamsDictionary,any,TransferDetails>,res:Response){
    const {sender,receipient,amount} = req.body;
    const idempotencykey = req.header("Idempotency-Key") as string;
    const sendingamount = parseFloat(amount);
    const isfundssufficient = await validateWalletBalance(sender,sendingamount);

    if(!isfundssufficient){
        return res.status(400).json({message:"Insufficient funds" });
    }
    
    const istransactionsuccessful = await processTransaction(sendingamount,receipient,sender);
    if(!istransactionsuccessful){
        return res.status(500).json({message:"Failed to initiate transaction" });
    }
    const transaction:Transaction = {
        amount:sendingamount,
        receipient,
        timestamp:new Date(),
    }
    await storeTransaction(transaction);
    return res.status(200).json({message:"Transaction successful" });
}