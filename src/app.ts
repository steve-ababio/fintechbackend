import dotenv from 'dotenv'; 
dotenv.config();
import express from 'express';
import cors from "cors";
import {router as authrouter} from "./routes/auth/auth";
import {router as walletrouter} from "./routes/wallet/wallet.route";
import helmet from 'helmet';
import "./events/createwallet/createwallet.event";

const PORT = process.env.PORT || 8050;
const app = express(); 

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(helmet());
app.use(authrouter);
app.use(walletrouter);

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
})