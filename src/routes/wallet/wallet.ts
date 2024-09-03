import express from "express";
import { viewWallet } from "../../controllers/wallet/viewwallet.controller";
import { initiateTransaction } from "../../controllers/wallet/initiatetransaction.controller";
import { viewTransactionHistory } from "../../controllers/wallet/viewtransactionhistory";
export const router = express.Router();

router.get("/viewwallet",viewWallet);
router.post("/initiatetransaction",initiateTransaction);
router.get("/viewtransactionhistory",viewTransactionHistory);