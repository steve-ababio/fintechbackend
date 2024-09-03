import { prisma } from "../../../lib/prisma";
import { Transaction } from "../../../types/types";

export async function validateWalletBalance(sender:string,amount:number){
    try{
        const balance = await fetchSenderWalletBalance(sender);
        return balance >= amount;
    }catch(error){
        //handle error
        console.log(error);
    }
}

export async function updateReceipientBalance(receiver:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{
                username:receiver
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        });
        return result;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function updateSenderBalance(sender:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{
                username:sender
            },
            data:{
                balance:{
                    decrement:amount
                }
            }
        });
        return result;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function processTransaction(amount:number,sender:string,receiver:string){
    try{
        const[senderwalletupdate,receipientwalletupdate] = await Promise.all([updateSenderBalance(sender,amount),updateReceipientBalance(receiver,amount)]);
        return senderwalletupdate && receipientwalletupdate;
    }catch(error){
        //handle error
    }
}
export async function fetchSenderWalletBalance(sender:string){
    try{
        const balance = await prisma.user.findUnique({
            where:{
                username:sender
            },
            select:{
                balance:true
            }
        });
        return balance;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function storeTransaction(transaction:Transaction){
    await prisma.transaction.create(transaction);
}