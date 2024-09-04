import {Response,Request} from "express";
import { fetchTransactionHistory } from "../../services/wallet/viewtransactionhistory/viewtransactionhistory.services";

export async function viewTransactionHistory(req:Request, res:Response){
    const userid = req.userid;
    try{
        const transactionhistory = await fetchTransactionHistory(userid!);
        if(!transactionhistory){
            return res.status(200).json({transactionhistory:[]});
        }
        return res.status(200).json({transactionhistory});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}