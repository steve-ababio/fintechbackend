import {sign,verify} from "jsonwebtoken";

export function generateJWTToken<T extends string|object|Buffer>(payload:T,secret:string,duration:string){
    const token = sign(payload,secret,{
        expiresIn:duration,
    });
    return token;
}
export function verifyToken(token:string,secret:string){
    const payload = verify(token,secret)
    return payload as {userid:string};
}