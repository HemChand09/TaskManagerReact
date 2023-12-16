import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem('token') || null,
        user:localStorage.getItem('user') || null
    },
    reducers:{
        setUsers:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
})
export const { setUsers} = AuthSlice.actions;
export default AuthSlice.reducer;