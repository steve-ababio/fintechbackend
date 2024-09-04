import express from "express";
import { registerUser } from "../../controllers/register/register.controller";
import { verifyEmail } from "../../controllers/verifyemail/verifyemail";
import { signIn } from "../../controllers/signin/signin.contoller";
export const router = express.Router();

router.post("/register",registerUser);
router.post("/signin",signIn);
router.get("/verification/:token",verifyEmail)