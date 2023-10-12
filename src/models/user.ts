import {Law} from './law'
import { News } from './news'
export interface User{
    id:number,
    news:News[],
    locked:boolean,
    firstName: string,
    password:string,
    secName:string,
    likednews:News[],
    email:string
    chatName:string,
    imagePath:string,
    laws?:Law[],
    comments:[]
}