import {createClient} from "redis";
export class RedisStore{
    private client = createClient({url:process.env.REDIS_URL});
    constructor(){
        this.connect_db();
    }
    private async connect_db(){
        try{
            await this.client.connect();
        }catch(error){
            //handle error
        }
    }
    async getData(key:string){
        const result = await this.client.get(key);
    } 
    async setData(key:string,idempotencykey:string){
        await this.client.set(key,idempotencykey);
    }
    private async disconnect(){
        try{
            await this.client.disconnect();
        }catch(error){
            //handle error
        }
    }
}

export const redisstore = new RedisStore();