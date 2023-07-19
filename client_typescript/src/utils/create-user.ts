import { User } from "../models/user";

export const createUser = ():User =>({
    
    password:"",
    email:"",
    firstName: "Proba",
    secName:"",
    likes:[],
    chatName:"",
    imagePath:""
})