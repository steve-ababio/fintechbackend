import express from "express";
import { registerUser } from "../../controllers/register/register.controller";
import { verifyEmail } from "../../controllers/verifyemail/verifyemail";
export const router = express.Router();

router.post("/register",registerUser);
router.post("/verification/:token",verifyEmail)