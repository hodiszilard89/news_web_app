import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import {RootState} from "../store"

interface UsersState {
  users: User[];
  user:User|undefined;
}

const initialState: UsersState = {
  users: [],
  user:undefined
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUsers: (state: UsersState, action: PayloadAction<User[]>) => {
      //action.type? MI AZ
      state.users = [...action.payload];
    },

    setEditUser:(state:UsersState, action :PayloadAction<User>)=>{
      state.user=action.payload;
    },

    updateUserItem: (
      state: UsersState,
      action: PayloadAction<{ index: number; item: User }>
    ) => {
      const { index, item } = action.payload;
      state.users[index] = item;
    },
  },
});

export const {setUsers, setEditUser} = usersSlice.actions;

export const usesSliceReducer = usersSlice.reducer
export const usesSlicePath = usersSlice.name;

//egész statet visszadja
export const selectUser = (state:RootState) => state.usersSlice.user;
