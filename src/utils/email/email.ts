import nodemailer from "nodemailer";
import { generateJWTToken } from "../token/token";

function createTransporter(){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });
    return transporter;
}

export async function sendVerificationEmail(toEmail: string,userid:string) {
    const emailsecret = process.env.EMAIL_SECRET!;
    const emailtoken = generateJWTToken({userid},emailsecret,"1d");
    const verificationurl = `http://192.168.0.108:${process.env.PORT}/verification/${emailtoken}`;
    const transporter = createTransporter();
    await transporter.sendMail({
        from:process.env.USER,
        to:toEmail,
        sender:process.env.USER,
        subject:"Verify your email",
        html:`Please click the following link to verify your email: <a href='${verificationurl}'>${verificationurl}</a>`
    })
}