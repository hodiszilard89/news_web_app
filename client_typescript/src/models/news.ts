
import {User} from './user'
export interface News {
    id:number,
    img_path:string,
    text:string,
    title:string,
    writer:User,
    likes?:User[]
    }