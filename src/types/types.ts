export type User = {
    username:string,
    email:string,
    password:string
}
export type TransactionDetails = {
    sender:string,
    receipient:string,
    amount:string
}
export type Transaction = {
    receipient:string, 
    amount:number,
    timestamp:Date,
    idempotencykey:string
}