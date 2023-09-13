import {Law} from './law'
import { News } from './news'
export interface User{
    id:number,
    news:News[],
    firstName: string,
    password:string,
    secName:string,
    likes:News[],
    email:string
    chatName:string,
    imagePath:string,
    laws?:Law[],
    comments:[]
}