import { prisma } from "../../../lib/prisma";
import {compare} from "bcryptjs";
export async function findUser(username: string){
    const result = await prisma.user.findUnique({
        where:{
            username
        }
    });
    return result;
}

export async function ComparePasswords(plainpassword:string,hashedpassword:string){
    let match = await compare(plainpassword,hashedpassword);
    return match;
}