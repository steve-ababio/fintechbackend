import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { Transaction, TransferDetails } from "../../typings/types";
import { getRecepientId, processTransaction, storeTransactionDetails, validateWalletFunds } from "../../services/wallet/transaction/transaction.services";

export async function initiateTransaction(req:Request<ParamsDictionary,any,TransferDetails>,res:Response){
    const senderid = req.userid!;
    const {receipientname,amount} = req.body;
    const sendingamount = parseFloat(amount);
    try{
        const isfundssufficient = await validateWalletFunds(senderid,sendingamount);
        if(!isfundssufficient){
            return res.status(400).json({message:"You cannot proceed with transaction due to insufficient funds"});
        }
        const receipient = await getRecepientId(receipientname);
        if(!receipient){
            return res.status(400).json({message:"Receipient does not exist"});
        }
        if(Object.is(receipient.id,senderid)){
            return res.status(400).json({message:"You cannot transfer funds to yourself"});
        }
        const istransactionsuccessful = await processTransaction(sendingamount,senderid,receipient.id);
        if(!istransactionsuccessful){
            return res.status(500).json({message:"Failed to initiate transaction" });
        }
        const transaction:Transaction = {
            amount:sendingamount,
            receipient:receipientname,
            userid:senderid,
            timestamp:new Date(),
        }
        await storeTransactionDetails(transaction);
        return res.status(200).json({message:"Transaction successful"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}