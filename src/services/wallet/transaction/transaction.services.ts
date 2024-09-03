import { prisma } from "../../../lib/prisma";
import { Transaction } from "../../../types/types";

export async function fetchSenderWalletBalance(userid:string){
    try{
        const balance = await prisma.wallet.findUnique({
            where:{
                userid
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
export async function validateWalletBalance(senderid:string,amount:number){
    try{
        const result = await fetchSenderWalletBalance(senderid);
        const {balance} = result!;
        return balance >= amount;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function updateReceipientBalance(recepientid:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{ 
                userId:recepientid
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
export async function updateSenderBalance(userId:string,amount:number){
    try{
        const result = await prisma.wallet.update({
            where:{
                userId
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
export async function processTransaction(amount:number,senderid:string,receipientid:string){
    try{
        const[senderwalletupdate,receipientwalletupdate] = await Promise.all([updateSenderBalance(senderid,amount),updateReceipientBalance(receipientid,amount)]);
        return senderwalletupdate && receipientwalletupdate;
    }catch(error){
        //handle error
    }
}
export async function getRecepientId(receipient:string){
    try{
        const result = await prisma.user.findUnique({
            where:{
                username:receipient
            },
            select:{
                id:true
            }
        });
        return result;
    }catch(error){
        //handle error
    }
}
export async function storeTransaction(transaction:Transaction){
    await prisma.transaction.create(transaction);
}