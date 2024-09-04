import { createUserWallet } from "../../services/wallet/createwallet/createwallet.services";
import { eventemitter } from "../emitter/emitter.event";

eventemitter.on("createwallet",async function(userid){
    await createUserWallet(userid);
});