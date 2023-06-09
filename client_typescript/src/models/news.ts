
import { Comment } from './comment'
import {User} from './user'
export interface News {
    id?:number,
    imgPath:string,
    text:string,
    title:string,
    writer:User,
    likes?:User[],
    comments?:Comment[],
    }