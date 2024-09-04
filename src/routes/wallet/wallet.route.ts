import express from "express";
import { viewWallet } from "../../controllers/wallet/viewwallet.controller";
import { initiateTransaction } from "../../controllers/wallet/initiatetransaction.controller";
import { viewTransactionHistory } from "../../controllers/wallet/viewtransactionhistory.controller";
import { checkIdempotencyKey } from "../../middlewares/idempotency/idempotency.middleware";
import { verifyUser } from "../../middlewares/auth/auth.middleware";
export const router = express.Router();

router.get("/viewwallet",verifyUser,viewWallet);
router.post("/initiatetransaction",checkIdempotencyKey,verifyUser,initiateTransaction);
router.get("/viewtransactionhistory",verifyUser,viewTransactionHistory);