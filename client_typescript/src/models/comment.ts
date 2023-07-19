import {User} from './user'
import {News} from './news'

export interface Comment {
    id?:number;
    text:string;
    writer:User;
    news:News;
    releaseDate:Date;
}