import { prisma } from "../../../lib/prisma";

export async function createUserWallet(userid:string){
    await prisma.wallet.create({
        data:{
            balance:10000.0,
            currency:"USD",
            userid
        }
    });
}