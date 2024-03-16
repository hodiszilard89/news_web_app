import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface LoginModalState{
    email:string,
    password:string,
    showLogin:boolean
}

const initialState:LoginModalState ={
    email:"",
    password:"",
    showLogin:false,
}

export const loginModalSlice = createSlice({
    name:"loginModal",
    initialState,
    reducers:{
        showLogin:(
            state:LoginModalState,
        )=>{
           
            state.showLogin=true;
        },
        closeLogin:(
            state:LoginModalState,
        )=>{
            state.showLogin=false;
        }
    }
});

export const { showLogin, closeLogin } = loginModalSlice.actions;
export const loginModalPath = loginModalSlice.name;
export const loginModalReducer = loginModalSlice.reducer;

export const selectShowLogin = (state: RootState) => state.loginModal.showLogin;
export const selectLogin = (state: RootState) => state.loginModal;
