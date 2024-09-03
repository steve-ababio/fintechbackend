export type User = {
    username:string,
    email:string,
    password:string
}
export type TransferDetails = {
    sender:string,
    receipient:string,
    amount:string
}
export type Transaction = {
    receipient:string, 
    amount:number,
    timestamp:Date,
}