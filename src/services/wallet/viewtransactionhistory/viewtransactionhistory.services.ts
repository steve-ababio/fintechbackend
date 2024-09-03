import { prisma } from "../../../lib/prisma";

export async function fetchTransactionHistory(username:string){
    try{
        const transactionhistory = await prisma.transaction.findMany({
            where:{
                username
            }
        });
        return transactionhistory;
    }catch(error){
        //handle error
    }
}