import { prisma } from "../../../lib/prisma";

export async function fetchWallet(userid:string){
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
}