export type User = {
    username:string,
    email:string,
    password:string
}
export type TransferDetails = {
    receipientname:string,
    amount:string
}
export type Transaction = {
    receipient:string, 
    amount:number,
    timestamp:Date,
    userid:string
}