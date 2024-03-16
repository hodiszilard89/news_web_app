import { Type } from './type'
import { Comment } from './comment'
import {User} from './user'
import { Genre } from './genre';
export interface News {
    id?:number,
    imgPath:string,
    text:string,
    subtitle:string,
    releasedate:Date;
    title:string,
    priority:boolean,
    writer?:User,
    types?:Type[],
    likes?:User[],
    comments?:Comment[],
    Genres?: Genre[];
    }