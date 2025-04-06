import {configureStore} from '@reduxjs/toolkit';
import myslice from './users/counterSlice';
import productslice from './Products/productSlice';
import orderSlice from './Orders/orderSlice';
export const store=configureStore({
    reducer:
    {
        slice:myslice,
        pro:productslice,
        order:orderSlice
    }
})
export type RootState=ReturnType<typeof store.getState>;
export type dispatchAction=typeof store.dispatch;