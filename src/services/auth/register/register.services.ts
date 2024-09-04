import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../typings/types";

export async function checkUsernameExistence(username:string){
    const result = await prisma.user.findUnique({where:{username}});
    return result !== null;
}
export async function createUser({username,email,password}:User){
    const result = await prisma.user.create({
        data:{
            username,
            email,
            password,
            confirmed:false
        },
    });
    return result;
}
export async function checkEmailExistence(email:string){
    const result = await prisma.user.findUnique({where:{email}});
    return result !== null;
}
export async function hashPassword(plainpassword:string){
    const hashedpassword = await bcrypt.hash(plainpassword,10);
    return hashedpassword;
}
export function checkFieldsAvailability({username,email,password}:User){
    return username !== "" && email !== "" && password !== "";
}
