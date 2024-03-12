import { User } from "../models/user";

export const createUser = ():User =>({
    news:[],
    email:"",
    password:"",
    imagePath:"",
    chatName:"",
    firstName: "Proba",
    secName:"",
    locked:false,
    likednews:[],
    comments:[],
    roles:[],
    id:0,  
})