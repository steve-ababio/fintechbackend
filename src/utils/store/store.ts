// import {createClient} from "redis";
// class RedisStore{
//     private client = createClient({url:process.env.REDIS_URL});
//     constructor(){
//         this.connect_db();
//     }
//     private async connect_db(){
//         try{
//             await this.client.connect();
//         }catch(error){
//             //handle error
//         }
//     }
//     async getData(idempotencykey:string){
//         try{
//             const result = await this.client.get(idempotencykey);
//             return result;
//         }catch(error){
//             //handle error
//         }
//     } 
//     async setData(idempotencykey:string,response:string,ttl:number){
//         try{
//             await this.client.setEx(idempotencykey,ttl,response);
//         }catch(error){
//             //handle error
//         }
//     }
// }

// export const redisstore = new RedisStore();

class InMemoryStore {
    private store = new Map<string,string>();
    getData(idempotencykey:string){
        return this.store.get(idempotencykey);
    }
    storeData(idempotencykey:string,response:string){
        this.store.set(idempotencykey,response);
    }
    checkData(idempotencykey:string){
        return this.store.has(idempotencykey);
    }
}
export const inmemorystore = new InMemoryStore();