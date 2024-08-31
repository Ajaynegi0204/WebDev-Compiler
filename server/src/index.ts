import express, { Request, Response } from "express"
import cors from "cors";
import {config} from "dotenv"
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(cookieParser());
config();




app.use('/compiler', compilerRouter);
app.use('/user', userRouter);



dbConnect();
app.listen(4000, () => {
    
    console.log("Listening on port 4000");
})