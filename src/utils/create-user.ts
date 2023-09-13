import { User } from "../models/user";

export const createUser = ():User =>({
    news:[],
    email:"",
    password:"",
    imagePath:"",
    chatName:"",
    firstName: "Proba",
    secName:"",
    likes:[],
    comments:[],
    laws:[],
    id:0,  
})