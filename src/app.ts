import express from 'express';
import cors from "cors";
import {router as authrouter} from "./routes/auth/auth";
import {router as walletrouter} from "./routes/wallet/wallet";

const PORT = process.env.PORT || 8000;
const app = express(); 

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(authrouter);
app.use(walletrouter);

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
})