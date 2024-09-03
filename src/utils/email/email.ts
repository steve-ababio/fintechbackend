import nodemailer from "nodemailer";
import { generateJWTToken } from "../token/token";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

export async function sendVerificationEmail(toEmail: string,userid:string) {
    const emailsecret = process.env.EMAIL_SECRET!;
    const emailtoken = generateJWTToken({userid},emailsecret,"1d");
    const verificationurl = `http://localhost:${process.env.PORT}/verification/${emailtoken}`;

    await transporter.sendMail({
        from:process.env.USER,
        to:toEmail,
        subject:"Verify your email",
        html:`Please click the following link to verify your email: <a href='${verificationurl}>${verificationurl}</a>`
    })
}