import {Request,Response} from "express";
import { fetchWallet } from "../../services/wallet/viewwallet/viewwallet.services";

export async function viewWallet(req:Request, res:Response){
    const userid = req.userid;
    try{
        const wallet = await fetchWallet(userid!);
        return res.status(200).json({wallet});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}