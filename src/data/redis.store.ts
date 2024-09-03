import {createClient} from "redis"; 

export class RedisStore{
    private client =  createClient({
        url:process.env.REDIS_URL,
    });
    get redisclient(){
        return this.client;
    }
    getData(key:string){
        this.client.get
    }
}

export const redisstore = new RedisStore();
