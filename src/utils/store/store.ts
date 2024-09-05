import Cache from "expiry-map";

const TTL = 180000; //3 minutes;
class IdempotencykeyStore {
    private store = new Cache(180000);
    getIdempotencyKey(idempotencykey:string){
        return this.store.get(idempotencykey);
    }
    storeIdempotencyKey<T>(idempotencykey:string,response:T){
        this.store.set(idempotencykey,response);
    }
    checkIdempotencyKey(idempotencykey:string){
        return this.store.has(idempotencykey);
    }
}
export const idempotencykeystore = new IdempotencykeyStore();