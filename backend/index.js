import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './route/auth_route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './route/user_route.js';
import listingRouter from './route/lising.route.js';

dotenv.config();
const port=process.env.PORT || 5000

const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)
// index.js ya server.js me
app.use(express.static('public'));


app.listen(port,()=>{
    connectDB();
    console.log(`server is running on port ${port}`)}
);



















    // password   YCk8EWryWvImzHnh
       //username    palabhinav675