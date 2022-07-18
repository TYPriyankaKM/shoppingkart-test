import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import Axios from "../../apis/Axios"

const initialState={
    addressList:[],
    error :""
}

export const fetchAddress =createAsyncThunk("address/fetchAddress",async(customerid)=>{
    return  fetch(`http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${customerid}/address`).then(data=>data.json()).then(finalData=>finalData).catch(err=>err)
})
// export const deleteAddress =createAsyncThunk("address/deleteAddress",async(customerid, addressid)=>{
//     return  fetch(`http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT/customers/${customerid}/address/${addressid}`,{method:"DELETE"}).then(data=>data.json()).then(finalData=>finalData).catch(err=>err)
// })
export const deleteAddress =createAsyncThunk("address/deleteAddress",async(customerid, addressid)=>{
    return await Axios.delete(`customers/${customerid}/address/${addressid}}`)
})

const addressSlice =createSlice({
    name:"address",
    initialState,
    extraReducers:{
        [fetchAddress.fulfilled]:(state, action)=>{
            state.addressList= action.payload.data;
        },
        [fetchAddress.rejected]: (state, action) => {
            state.error = action.error.message;
          },
        [deleteAddress.fulfilled]:(state, action)=>{
            console.log(action.payload.data.message)
        },
        [deleteAddress.rejected]: (state, action) => {
            console.log(action.payload.data.message)
          },
    }
})

export default addressSlice.reducer