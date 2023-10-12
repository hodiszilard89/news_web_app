import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface RegModalState{
    email:string,
    password:string,
    showReg:boolean
}

const initialState:RegModalState ={
    email:"",
    password:"",
    showReg:false,
}

export const regModalSlice = createSlice({
    name:"regModal",
    initialState,
    reducers:{
        showReg:(
            state:RegModalState,
        )=>{
            state.showReg=true;
        },
        closeReg:(
            state:RegModalState,
        )=>{
            state.showReg=false;
        }
    }
});

export const { showReg, closeReg } = regModalSlice.actions;
export const regModalPath = regModalSlice.name;
export const regModalReducer = regModalSlice.reducer;

export const selectShowReg = (state: RootState) => state.regModal.showReg;
// export const selectReg = (state: RootState) => state.regModal;
