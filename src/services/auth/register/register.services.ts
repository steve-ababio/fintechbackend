import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../types/types";

export async function checkUsernameExistence(username:string){
    try{
        const result = await prisma.user.findUnique({where:{username}});
        return result !== null;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function createUser({username,email,password}:User){
    try{
        const result = await prisma.user.create({
            username,
            email,
            password
        });
        return result;
    }catch(error){
        //handle error
    }
}
export async function checkEmailExitence(email:string){
    try{
        const result = await prisma.user.findUnique({where:{email}});
        return result !== null;
    }catch(error){
        //handle error
        console.log(error);
    }
}
export async function hashPassword(plainpassword:string){
    const hashedpassword = await bcrypt.hash(plainpassword,10);
    return hashedpassword;
}
export async function createUserWallet(userid:string){
    try{
        await prisma.wallet.create({
            data:{
                balance:0.0,
                currency:"USD",
                userid
            }
        });
    }catch(error){
        //handle error
    }
}
export function checkFieldsAvailability({username,email,password}:User){
    return username !== "" && email !== "" && password !== "";
}
