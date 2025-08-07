import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './route/auth_route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const port=process.env.PORT || 5000

const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
}))

app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectDB();
    console.log(`server is running on port ${port}`)}
);


app.get('/',(req,res)=>{
    res.send('Hello World');
})

















    // password   YCk8EWryWvImzHnh
       //username    palabhinav675