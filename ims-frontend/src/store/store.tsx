import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/CustomerReducer";
import itemReducer from "../reducers/ItemReducer";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        items : itemReducer,
    }
})

export type AppDispatch = typeof store.dispatch;