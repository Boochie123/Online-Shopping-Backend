import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

import userRouter from '../Routers/userRouter';
import productRouter from '../Routers/productRouter';
import paymentsRouter from '../Routers/paymentsRouter';
import orderRouter from '../Routers/orderRouter';

const app:express.Application=express();

app.use(express.json());

app.use(cors());

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port=process.env.PORT || 5000

console.log('MongoDB URL:', process.env.MONGO_DB_URL || 'NOT FOUND'); // Debug


if(process.env.MONGO_DB_URL!==undefined)
{
    mongoose.connect(process.env.MONGO_DB_URL).then(()=>
    {
        console.log(`Connected to Mongodb successfully`)
    }).catch((error)=>
    {
        console.error(error);
        process.exit(1);
    })   
}

app.get('/',(request:express.Request,response:express.Response)=>
{
    response.end(`<h2>ExpressJs server backend</h2>`)
})

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/payments',paymentsRouter);

app.listen(port,()=>
{
    console.log(`Expressjs server started at ${port}`)
})



