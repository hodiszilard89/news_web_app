import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { RootState } from "../store";
import { createUser } from "../../utils/create-user";

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
        // setSearchText: (state: SearchParamsState, action: PayloadAction<string>) => {
        //     state.search = action.payload;
        //   },
        setToken:(
            state:AuthUserState,
            action:PayloadAction<string>
        )=>{
            //console.log(action.payload);
            state.token=action.payload
            
        }, 
        setUser:(
            state:AuthUserState,
            action:PayloadAction<User|undefined|null>
        )=>{
            //console.log(action.payload);
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