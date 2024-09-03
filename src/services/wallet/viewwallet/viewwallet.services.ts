import { prisma } from "../../../lib/prisma";

export async function fetchWallet(userid:string){
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