import { createSlice } from "@reduxjs/toolkit";

// localStorage.removeItem("user");
const storedUser=localStorage.getItem("user");

const initialState={
    currentUser:storedUser? JSON.parse(storedUser):null,
    // currentUser: { name:'Raju' },
}

const userslice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.currentUser=action.payload;
        }
    }
})

export const {setUser}=userslice.actions;

export default userslice.reducer;