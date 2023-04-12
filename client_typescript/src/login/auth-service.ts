import { User } from "../models/user";
import {ValidationError} from 'yup'
const TOKE_NAME ="autToken"
const API_URL = "/users"

class AuthServiceIml{
   
    private  storage:Storage;

    constructor(){
        this.storage = window.sessionStorage
    }

    public async login(username:string, password:string):  Promise<void>{
        const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "accept":"application/json"
            },
            body:JSON.stringify({
                username,
                password
            })
        })
        
        if (response.status!=200)
        {
            throw new ValidationError ("invalid username or password")
        }
        const {authToken} = await response.json() 
        this.authToken=authToken;
    }

    // public async getProfile(): Promise<User>{

    // }

    public get authToken(): string | null{
        return this.storage.getItem(TOKE_NAME) ?? null   
    }

    public set authToken(token : string | null){
        if (token){
       token && this.storage.setItem(TOKE_NAME, token) }
    }
} 


export const AuthService = new AuthServiceIml();  