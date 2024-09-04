import { prisma } from "../../../lib/prisma";
import { Transaction } from "../../../typings/types";

export async function fetchSenderWalletBalance(userid:string){
    const balance = await prisma.wallet.findUnique({
        where:{
            userid
        },
        select:{
            balance:true
        }
    });
    return balance;
}
export async function validateWalletFunds(senderid:string,amount:number){
    const result = await fetchSenderWalletBalance(senderid);
    const {balance} = result!;
    return balance >= amount;
}
export async function updateReceipientBalance(recepientid:string,amount:number){
    const result = await prisma.wallet.update({
        where:{ 
            userid:recepientid
        },
        data:{
            balance:{
                increment:amount
            }
        }
    });
    return result;
}
export async function updateSenderBalance(userid:string,amount:number){
    const result = await prisma.wallet.update({
        where:{
            userid
        },
        data:{
            balance:{
                decrement:amount
            }
        }
    });
    return result;
}
export async function processTransaction(amount:number,senderid:string,receipientid:string){
    const[senderwalletupdate,receipientwalletupdate] = await Promise.all([updateSenderBalance(senderid,amount),updateReceipientBalance(receipientid,amount)]);
    return senderwalletupdate && receipientwalletupdate;
}
export async function getRecepientDetails(receipient:string){
    const result = await prisma.user.findUnique({
        where:{
            username:receipient
        },
        select:{
            id:true,
            email:true
        }
    });
    return result;
}
export async function getSenderDetails(senderid:string){
    const result = await prisma.user.findUnique({
        relationLoadStrategy:"join",
        where:{
            id:senderid
        },
        select:{
            email:true,
            username:true,
            wallet:true
        }
    });
    return result;
}
export async function storeTransactionDetails(transaction:Transaction){
    await prisma.transaction.create({
        data:transaction,
    });
}