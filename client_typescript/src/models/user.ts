import {Roles} from './roles'
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
    roles?:Roles[],
    comments:[]
}