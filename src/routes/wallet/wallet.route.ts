import express from "express";
import { viewWallet } from "../../controllers/wallet/viewwallet.controller";
import { initiateTransaction } from "../../controllers/wallet/initiatetransaction.controller";
import { viewTransactionHistory } from "../../controllers/wallet/viewtransactionhistory.controller";
import { checkIdempotencyKey } from "../../middlewares/idempotency/idempotency.middleware";
export const router = express.Router();

router.get("/viewwallet",viewWallet);
router.post("/initiatetransaction",checkIdempotencyKey,initiateTransaction);
router.get("/viewtransactionhistory",viewTransactionHistory);