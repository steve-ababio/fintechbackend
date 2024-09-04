import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { Transaction, TransferDetails } from "../../typings/types";
import { getRecepientDetails, getSenderDetails, processTransaction, storeTransactionDetails, validateWalletFunds } from "../../services/wallet/transaction/transaction.services";
import { idempotencykeystore } from "../../utils/store/store";
import { sendProcessedTransactionNotification, sendReceivedMoneyNotification } from "../../utils/email/email";

export async function initiateTransaction(req:Request<ParamsDictionary,any,TransferDetails>,res:Response){
    const senderid = req.userid!;
    const idempotencykey = req.headers["idempotency-key"] as string;
    const {receipientname,amount} = req.body;
    const sendingamount = parseFloat(amount);
    try{
        const isfundssufficient = await validateWalletFunds(senderid,sendingamount);
        if(!isfundssufficient){
            const message = "You cannot proceed with transaction due to insufficient funds";
            await idempotencykeystore.storeData(idempotencykey,message);
            return res.status(400).json({message});
        }
        const [receipient,sender] = await Promise.all([getRecepientDetails(receipientname),getSenderDetails(senderid)]);
        if(!receipient){
            const message = "Receipient does not exist";
            await idempotencykeystore.storeData(idempotencykey,message);
            return res.status(400).json({message});
        }
        if(Object.is(receipient.id,senderid)){
            const message = "You cannot transfer funds to yourself";
            await idempotencykeystore.storeData(idempotencykey,message);
            return res.status(400).json({message});
        }
        const istransactionsuccessful = await processTransaction(sendingamount,senderid,receipient.id);
        if(!istransactionsuccessful){
            const message = "Failed to initiate transaction";
            await idempotencykeystore.storeData(idempotencykey,message);
            return res.status(500).json({message});
        }
        const transaction:Transaction = {
            amount:sendingamount,
            receipient:receipientname,
            userid:senderid,
            timestamp:new Date(),
        }
        await storeTransactionDetails(transaction);
        const message = "Transaction successful";
        await idempotencykeystore.storeData(idempotencykey,message);
        
        Promise.all([
            sendReceivedMoneyNotification(receipient.email,sender!.wallet!.currency!,sender!.username!,sendingamount),
            sendProcessedTransactionNotification(sender!.email,sender!.wallet!.currency,receipientname,sendingamount)
        ])
        return res.status(200).json({message});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}