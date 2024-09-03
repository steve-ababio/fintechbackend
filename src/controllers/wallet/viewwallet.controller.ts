import {ParamsDictionary} from "express-serve-static-core";
import {Request,Response} from "express";
import { fetchWallet } from "../../services/wallet/viewwallet/viewwallet.services";

export async function viewWallet(req:Request<ParamsDictionary>, res:Response){
    const userid = req.params.userid;
    const wallet = await fetchWallet(userid);
    return res.status(200).json({wallet});
}