import { prisma } from "../../../lib/prisma";

export async function fetchTransactionHistory(userid:string){
    const transactionhistory = await prisma.transaction.findMany({
        where:{
            userid
        }
    });
    return transactionhistory;
}