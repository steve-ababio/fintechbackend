import { createUserWallet } from "../../services/wallet/createwallet/createwallet.services";
import { eventemitter } from "../emitter/emitter.event";

console.log("listening for create wallet notifications");
eventemitter.on("createwallet",async function(userid){
    await createUserWallet(userid);
});