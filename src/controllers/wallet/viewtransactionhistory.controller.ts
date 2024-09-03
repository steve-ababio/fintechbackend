import {ParamsDictionary} from "express-serve-static-core";
import {Response,Request} from "express";
import { fetchTransactionHistory } from "../../services/wallet/viewtransactionhistory/viewtransactionhistory.services";

export async function viewTransactionHistory(req:Request<ParamsDictionary,any,{username:string}>, res:Response){
    const {username} = req.body;
    const transactionhistory = await fetchTransactionHistory(username);
    if(!transactionhistory){
        return res.status(200).json({transactionhistory:[]});
    }
    return res.status(200).json({transactionhistory});
}