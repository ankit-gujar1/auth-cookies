import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app=express();

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("backend is up and running");
    });
})
.catch((e)=>{
    console.log(e);
})