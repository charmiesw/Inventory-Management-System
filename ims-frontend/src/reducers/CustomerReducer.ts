import {Customers} from "../models/Customer.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState : Customers[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/customer'
})

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async(customer:Customers) => {
        try {
            const response = await api.post('/add', customer);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const getCustomer = createAsyncThunk(
    'customer/getCustomer',
    async() => {
        try {
            const response = await api.get('/view');
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async(id : number) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async(customer: Customers) => {
        try {
            const response = await api.put(`/update/${customer.CustomerID}`, customer);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
)


const customerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
            .addCase(saveCustomer.pending, (state, action) => {
                console.log("Save customer pending")
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                console.log("Save customer fulfilled")
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error('Save customer rejected');
            });
        builder
            .addCase(getCustomer.pending, (state, action) => {
                console.log("Get customer pending")
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getCustomer.rejected, (state, action) => {
                console.error('Get customer rejected');
            });
        builder
            .addCase(updateCustomer.pending, (state, action) => {
                console.log("Update customer pending", action.payload)
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const customer = state.find((customer: Customers) => customer.Email === action.payload.Email);
                if(customer){
                    customer.Name = action.payload.Name;
                    customer.Address = action.payload.Address;
                }
                console.log("Update customer fulfilled", action.payload)
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                console.error('Update customer rejected');
            });
        builder
            .addCase(deleteCustomer.pending, (state, action) => {
                console.log("Delete customer pending")
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                console.log("Delete customer fulfilled")
                state = state.filter((customer: Customers) => customer.CustomerID !== action.payload.CustomerID);
                console.log(state)
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                console.error('Delete customer rejected');
            });
    }
});

export default customerSlice.reducer;
