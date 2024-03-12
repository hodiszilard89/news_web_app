import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { RootState } from "../store";

interface AuthUserState{
    user:User|undefined;
    token:string;
}

const initialState:AuthUserState={
    user:undefined,
    token:""
}

export const authUserSlice = createSlice({
    name:"authUser",
    initialState,
    reducers:{

        setToken:(
            state:AuthUserState,
            action:PayloadAction<string>
        )=>{

            state.token=action.payload
            
        }, 
        setUser:(
            state:AuthUserState,
            action:PayloadAction<User|undefined|null>
        )=>{
            action.payload && (state.user={...action.payload})
            
        },
        outUser:(
            state:AuthUserState,
           
        )=>{
        
            state.user=undefined
       
            
        }
    }

})

export const  {setUser,outUser,setToken} = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
export const authUserPath = authUserSlice.name;

export const selectOnlineUser = (state:RootState) => state.authUser.user;
export const selectAuthUser = (state:RootState) => state.authUser;