import Cache from "expiry-map";

const TTL = 180000; //3 minutes;
class IdempotencykeyStore {
    private store = new Cache(180000);
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
export const idempotencykeystore = new IdempotencykeyStore();